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
import ProjectStatusEnum from "entities/project/ProjectStatusEnum"
import TransactionActivityItem from "components/modules/transaction/TransactionActivityItem"
// import useWeb3 from "hooks/useWeb3"
// import { Principal } from "@dfinity/principal"

const { Title, Paragraph, Text, Link } = Typography

const ProjectPage: React.FC = () => {
  const { message } = App.useApp()
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
  //console.log(project);
  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => services.rbPoolService.getPoolTransactions(
      projectId as string,
      0,
      10
    )
  })
  //console.log(transactions);
  // const { accounts } = useWeb3()  

  // const { data: balance, isLoading: isLoadingBalance } = useQuery({
  //   queryKey: ['balance'],
  //   queryFn: () => services.rbPoolService.getUserTotalSupply(      
  //     (accounts?.length || 0) > 0 ? Principal.fromText(accounts!![0]) : undefined
  //  ),
  //   enabled: false, 
  // })


  const { mutate: investMutation, isLoading: investMutationLoading } = useMutation({
    mutationKey: ['invest', projectId],
    mutationFn: async (value: number) => {
      await services.projectService.depositToRBPoolPrincipal(
        'dummy_usdc',
        BigInt(parseInt(`${parseFloat(`${value}`) * 100000000}`))
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
        BigInt(parseInt(`${parseFloat(`${value}`) * 100000000}`))
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
                      <Text strong>{ProjectStatusEnum.OPEN}</Text>
                    </Space>

                    {!authenticationStore.token ? null : (
                      <Statistic
                        title="Your current position"
                        value={20}
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
                                      <Button block>
                                        MAX
                                      </Button>
                                    </Col>
                                  </Row>

                                  <Text>Balance: 33.78 ckUSDC</Text>

                                  <Paragraph type="secondary">
                                    By clicking “Invest” below, I hereby agree to the
                                    <Link href="https://ant.design" target="_blank">
                                      {" Pool Aggrement"}
                                    </Link>
                                    . Please note the protocol deducts a 0.50% fee upon withdrawal for protocol reserves.
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
                                        suffix="RBX"
                                        precision={2}
                                        value={withdrawValue}
                                        onChange={(value) => setWithdrawValue(value || 0)}
                                        style={{ width: '100%' }}
                                      />
                                    </Col>

                                    <Col span={6}>
                                      <Button block>
                                        MAX
                                      </Button>
                                    </Col>
                                  </Row>                                  
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
                      <Text type="secondary">Outstanding loan value</Text>
                      <Statistic
                        value={(Number(project.total_loan_amount) / 1000000).toString()}
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
                        value={(Number(project.total_loan_amount) / 1000000).toString()}
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