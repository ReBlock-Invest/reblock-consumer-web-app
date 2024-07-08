import { Avatar, Button, Card, Col, Divider, Flex, Layout, Row, Space, Statistic, Skeleton, Tabs, Tag, Typography, theme, InputNumber, App, List } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useParams } from "react-router-dom"
import { useMutation, useQuery } from "react-query"
import Colors from "components/themes/Colors"
import FontFamilies from "components/themes/FontFamilies"
import MainLayout from "components/layouts/MainLayout"
import React, { useCallback, useMemo, useState } from "react"
import useAuthenticationStore from "stores/useAuthenticationStore"
import UserInvestStateEnum from "entities/user/UserInvestStateEnum"
import useKYCStore from "stores/useKYCStore"
import ConfirmInvestmentDrawer from "components/modules/projects/drawers/ConfirmInvestmentDrawer"
import useServices from "hooks/useServices"
import TransactionActivityItem from "components/modules/transaction/TransactionActivityItem"
import useWeb3 from "hooks/useWeb3"
// import { Principal } from "@dfinity/principal"

const { Title, Paragraph, Text, Link } = Typography

function formatBigInt(amount: bigint | undefined): string {
 if (amount === undefined) return "_"

  return (Number(amount / BigInt(10000)) / 100).toFixed(2)
}

const ProjectPage: React.FC = () => {
  const { message } = App.useApp()
  const { accounts } = useWeb3()  

  const {
    token: {
      colorPrimary,
      colorTextLightSolid,
      colorWarning,
      colorText,
    }
  } = theme.useToken()

  const kycStore = useKYCStore()
  const authenticationStore = useAuthenticationStore()

  const services = useServices()
  const { projectId } = useParams()

  const [isOpenConfirmInvestmentDrawer, setIsOpenInvestmentDrawer] =
    useState(false)
  const [investmentValue, setInvestmentValue] = useState(0)
  const [withdrawValue, setWithdrawValue] = useState(0)

  const { data: userbalance, isLoading: isLoadingBalance } = useQuery({
    queryKey: ["userbalance", !!accounts && accounts.length > 0 ? accounts[0] : ""],
    queryFn: () => services.projectService.getCkUSDCBalance(      
      !!accounts && accounts.length > 0 ? accounts[0] : ""
    ),
    enabled: !!accounts && accounts.length > 0,
  })

  const { data: userPoolTokenbalance, isLoading: isLoadingTokenBalance } = useQuery({
    queryKey: ["userPoolTokenbalance", !!accounts && accounts.length > 0 ? accounts[0] : ""],
    queryFn: () => services.rbPoolService.getUserPoolToken(
      projectId as string,
      !!accounts && accounts.length > 0 ? accounts[0] : ""
    ),
    enabled: !!accounts && accounts.length > 0,
  })

  const { data: tokenSymbol } = useQuery({
    queryKey: ["tokenSymbol", projectId],
    queryFn: () => services.rbPoolService.getTokenSymbol(
      projectId as string,
    ),
    enabled: !!projectId,
  })

  const { data: outstandingLoan } = useQuery({
    queryKey: ["outstandingLoan", projectId],
    queryFn: () => services.rbPoolService.getOutstandingLoan(
      projectId as string,
    ),
    enabled: !!projectId,
  })

  const { data: originatedLoan } = useQuery({
    queryKey: ["originationLoan", projectId],
    queryFn: () => services.rbPoolService.getOriginatedLoan(
      projectId as string,
    ),
    enabled: !!projectId,
  })

  const { data: positionbalance, isLoading: isLoadingPositionBalance } = useQuery({
    queryKey: ["positionbalance", !!accounts && accounts.length > 0 ? accounts[0] : ""],
    queryFn: () => services.projectService.getPoolBalance(
      projectId as string,
      !!accounts && accounts.length > 0 ? accounts[0] : ""
    ),
    enabled: !!accounts && accounts.length > 0,
  })

  const { data: userInfoData } = useQuery({
    queryKey: ['userinfo'],
    queryFn: () => services.authenticationService.getUserInfo(),
    enabled: !!services.authenticationService.getIsAuthenticated(),
  })

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => services.projectService.getProject(
      projectId as string
    )
  })

  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['transactions', !!accounts && accounts.length > 0 ? accounts[0] : ""],
    queryFn: () => services.rbPoolService.getUserTransactions(
      projectId as string,
      !!accounts && accounts.length > 0 ? accounts[0] : "",
      0,
      100
    ),
    enabled: !!accounts && accounts.length > 0,
  })

  const { mutate: investMutation, isLoading: investMutationLoading } = useMutation({
    mutationKey: ['invest', projectId],
    mutationFn: async (value: number) => {
      await services.projectService.depositToRBPoolPrincipal(
        projectId as string,
        BigInt(parseInt(`${parseFloat(`${value}`) * 1000000}`))
      )
    },
    onSuccess() {
      message.success('Investment succeed!')
      setIsOpenInvestmentDrawer(false)
      setInvestmentValue(0)
    },
    onError(err) {
      message.error('Investment failed!')
    }
  })

  const { mutate: withdrawMutation, isLoading: withdrawMutationLoading } = useMutation({
    mutationKey: ['withdraw', projectId],
    mutationFn: async (value: number) => {
      await services.projectService.withdraw(
        projectId as string,
        BigInt(parseInt(`${parseFloat(`${value}`) * 1000000}`))
      )
    },
    onSuccess() {
      message.success('Withdraw succeed!')
      setWithdrawValue(0)
    },
    onError(err) {
      message.error('Withdraw failed!')
    }
  })

  const investButtonText = useMemo(() => {
    if (!authenticationStore.token) {
      return "Connect Wallet"
    }
    if (!userInfoData || !userInfoData.invest_state || userInfoData.invest_state === UserInvestStateEnum.WALLET_VERIFIED) {
      return "Verify Identity"
    }
    if (userInfoData.invest_state === UserInvestStateEnum.PENDING_KYC) {
      return "Pending Verification"
    }
    return "Invest"
  }, [userInfoData, authenticationStore.token])

  const onInvestButtonPressed = useCallback(() => {
    if (!authenticationStore.token) {
      authenticationStore.setIsShowConnectWalletModal(true)
    } else if (!userInfoData || !userInfoData.invest_state || userInfoData.invest_state === UserInvestStateEnum.WALLET_VERIFIED) {
      kycStore.setIsShowKYCModal(true)
    }
    if (userInfoData?.invest_state === UserInvestStateEnum.KYC_VERIFIED) {
      if (investmentValue <= 0) {
        message.error("Investment value should be greater than zero!")
      } else {
        setIsOpenInvestmentDrawer(true)
      }
    }
  }, [authenticationStore, userInfoData, kycStore, investmentValue, message])

  const onWithdrawButtonPressed = useCallback(() => {
    withdrawMutation(
      withdrawValue
    )
  }, [withdrawMutation, withdrawValue])
    
  const setDepositMaxValue = () => {
    if (userbalance !== undefined) {
      setInvestmentValue(Number(userbalance / BigInt(10000)) / 100)
    }
  };

  const setWithdrawMaxValue = () => {
    if (userPoolTokenbalance !== undefined) {
      setWithdrawValue(Number(userPoolTokenbalance / BigInt(10000)) / 100)
    }
  };

  return (
    <MainLayout>
      {isLoading || project == null ? (
        <Card className="m-md">
          <Skeleton />
        </Card>
      ) : (
        <Layout>
          <ConfirmInvestmentDrawer
            isLoading={investMutationLoading}
            open={isOpenConfirmInvestmentDrawer}
            onClose={() => setIsOpenInvestmentDrawer(false)}
            onConfirm={() => investMutation(investmentValue)}
            value={investmentValue}
          />
          <Layout.Content style={{ overflowX: 'hidden', marginTop: '-1px', paddingBottom: '16px' }}>
            <Flex
              style={{
                backgroundColor: colorPrimary,
                backgroundImage: "url('/images/title-wrapper-bg.svg')",
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: 'calc(100vw + 200px)',
                borderBottomLeftRadius: '50%',
                borderBottomRightRadius: '50%',
                marginLeft: '-100px',
                paddingLeft: '150px',
                paddingRight: '150px',
              }}
            >
              <Title level={2}
                className="text-center"
                style={{
                  color: colorTextLightSolid,
                  marginBottom: '64px',
                }}
              >
                {project.title}
              </Title>
            </Flex>
            <Row className="mt-md" gutter={[0, 16]}>
              <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
                <Card
                  className="mx-md"
                  bordered={false}
                  bodyStyle={{
                    padding: '16px',                    
                  }}
                >
                  <Paragraph>
                    {project.description}
                  </Paragraph>
                  <Flex vertical gap={16}>
                    <Row justify="space-between">
                      <Col>
                        <Space direction="vertical">
                          <Space>
                            <Avatar src={project.issuer_picture} />
                            <Tag color="white" style={{ backgroundColor: colorWarning, color: colorText }} bordered={false}>Rating {project.credit_rating}</Tag>
                          </Space>
                          <Text type="secondary">{project.issuer_description}</Text>
                        </Space>
                      </Col>
                      <Col>
                        <Space direction="vertical" align="end">
                          <Text type="secondary">APR</Text>
                          <Text strong>{project.APR}</Text>
                        </Space>
                      </Col>
                    </Row>

                    <Space direction="vertical" size={0}>
                      <Text type="secondary">Loan Term</Text>
                      <Text strong>{project.loan_term}</Text>
                    </Space>

                    <Space direction="vertical" size={0}>
                      <Text type="secondary">Payment Frequency</Text>
                      <Text strong>{project.payment_frequency}</Text>
                    </Space>

                    <Space direction="vertical" size={0}>
                      <Text type="secondary">Status</Text>
                      <Text strong>{project.status.toUpperCase()}</Text>
                    </Space>

                    {!authenticationStore.token ? null : (
                      <Statistic
                        title="Your current position"
                        value={isLoadingPositionBalance ? "_" : formatBigInt(positionbalance as bigint)}
                        precision={2}
                        decimalSeparator="."
                        suffix="ckUSDC"
                      />)}

                    <Divider style={{ margin: 0 }} />

                    <Tabs
                      defaultActiveKey="invest"
                      items={[
                        {
                          key: 'invest',
                          label: 'Invest',
                          children: (
                            <Flex vertical gap={8}>
                              {userInfoData?.invest_state === UserInvestStateEnum.KYC_VERIFIED ? (
                                <Space direction="vertical">
                                  <Row
                                    style={{
                                      backgroundColor: Colors.primaryLight,
                                      borderRadius: 4,
                                      padding: '8px',
                                    }}
                                    justify="space-between"
                                    gutter={8}
                                  >
                                    <Col span={18}>
                                      <InputNumber
                                        suffix="ckUSDC"
                                        precision={2}
                                        value={investmentValue}
                                        onChange={(value) => setInvestmentValue(value || 0)}
                                        style={{ width: '100%' }}
                                      />
                                    </Col>

                                    <Col span={6}>
                                      <Button block onClick={setDepositMaxValue}>
                                        MAX
                                      </Button>
                                    </Col>
                                  </Row>

                                  <Text>Balance: { isLoadingBalance ? "_" : formatBigInt(userbalance as bigint)} ckUSDC</Text>

                                  <Paragraph type="secondary">
                                    By clicking “Invest” below, I hereby agree to the
                                    <Link href="https://ant.design" target="_blank">
                                      {" Pool Aggrement"}
                                    </Link>
                                    . Please note the protocol deducts 0.01 ckUSDC for ckUSDC transaction fee and a 0.10% fee upon deposit for protocol reserves.
                                  </Paragraph>
                                </Space>
                              ) : null}
                              <Button
                                type="primary"
                                size='large'
                                icon={userInfoData?.invest_state === UserInvestStateEnum.KYC_VERIFIED ? <PlusOutlined /> : null}
                                onClick={onInvestButtonPressed}
                              >
                                {investButtonText}
                              </Button>
                            </Flex>
                          )
                        },
                        {
                          key: 'withdraw',
                          label: 'Withdraw',
                          children: (
                            <Flex vertical gap={8}>
                              {userInfoData?.invest_state === UserInvestStateEnum.KYC_VERIFIED ? (
                                <Space direction="vertical">
                                  <Row
                                    style={{
                                      backgroundColor: Colors.primaryLight,
                                      borderRadius: 4,
                                      padding: '8px',
                                    }}
                                    justify="space-between"
                                    gutter={8}
                                  >
                                    <Col span={18}>
                                      <InputNumber
                                        suffix={tokenSymbol as string}
                                        precision={2}
                                        value={withdrawValue}
                                        onChange={(value) => setWithdrawValue(value || 0)}
                                        style={{ width: '100%' }}
                                      />
                                    </Col>

                                    <Col span={6}>
                                      <Button block onClick={setWithdrawMaxValue}>
                                        MAX
                                      </Button>
                                    </Col>
                                  </Row>

                                  <Text>Balance: { isLoadingTokenBalance ? "_" : formatBigInt(userPoolTokenbalance as bigint)} {tokenSymbol as string}</Text>

                                  <Paragraph type="secondary">
                                    By clicking “Withdraw below, I hereby agree to the
                                    <Link href="https://ant.design" target="_blank">
                                      {" Pool Aggrement"}
                                    </Link>
                                    . Please note the protocol deducts 0.01 ckUSDC for ckUSDC transaction fee and a 0.10% fee upon withdraw for protocol reserves.
                                  </Paragraph>
                                </Space>
                              ) : null}
                              <Button
                                type="primary"
                                size='large'
                                loading={withdrawMutationLoading}
                                onClick={onWithdrawButtonPressed}
                                style={{
                                  marginTop: '16px'
                                }}
                              >
                                Withdraw
                              </Button>
                            </Flex>
                          )
                        }
                      ]}
                    />
                  </Flex>
                </Card>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
                <Flex
                  vertical
                  gap={16}
                  style={{
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    paddingBottom: '16px',
                    paddingTop: '4px',
                  }}>

                  <Flex vertical id="asset-overview">
                    <Space direction="vertical" size={0}>
                      <Text type="secondary">Pool Canister</Text>
                      <a href={"https://dashboard.internetcomputer.org/canister/" + project.canister_id} target="_blank" rel="noopener noreferrer" >{project.canister_id}</a>
                    </Space>

                    <Divider />
                    <Space direction="vertical" size={0}>
                      <Text type="secondary">Outstanding loan value</Text>
                      <Statistic
                        value={formatBigInt(outstandingLoan)}
                        precision={2}
                        suffix={
                          <Text type="secondary" style={{ fontWeight: 400 }}>ckUSDC</Text>
                        }
                        valueStyle={{
                          fontFamily: FontFamilies.primary,
                          fontSize: 16,
                          fontWeight: 600,
                        }}
                      />
                    </Space>

                    <Divider />

                    <Space direction="vertical" size={0}>
                      <Text type="secondary">Loan originated</Text>
                      <Statistic
                        value={formatBigInt(originatedLoan)}
                        precision={2}
                        suffix={
                          <Text type="secondary" style={{ fontWeight: 400 }}>ckUSDC</Text>
                        }
                        valueStyle={{
                          fontFamily: FontFamilies.primary,
                          fontSize: 16,
                          fontWeight: 600,
                        }}
                      />
                    </Space>

                    <Divider />

                    <Space direction="vertical" size={0}>
                      <Text type="secondary">30-Day APY</Text>
                      <Statistic
                        value={project.APR}
                        precision={2}
                        valueStyle={{
                          fontFamily: FontFamilies.primary,
                          fontSize: 16,
                          fontWeight: 600,
                        }}
                      />
                    </Space>

                    <List
                      itemLayout="horizontal"
                      dataSource={transactions}
                      loading={isLoadingTransactions}
                      header={
                        <Title
                          level={4}
                        >
                          Recent Activity
                        </Title>
                      }
                      renderItem={(item, index) => (
                        <TransactionActivityItem
                          transaction={item}
                        />
                      )}
                    />

                    
                  </Flex>
                </Flex>
              </Col>
            </Row>            
          </Layout.Content>
        </Layout>
      )
      }
    </MainLayout >
  )
}

export default ProjectPage