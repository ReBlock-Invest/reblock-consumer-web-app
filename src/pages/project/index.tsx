import { Affix, Anchor, Avatar, Button, Card, Col, Divider, Flex, Layout, List, Row, Space, Statistic, Skeleton, Tabs, Tag, Typography, theme } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import Colors from "components/themes/Colors"
import FontFamilies from "components/themes/FontFamilies"
import MainLayout from "components/layouts/MainLayout"
import React, { useCallback, useMemo } from "react"
import TransactionActivityItem from "components/modules/transaction/TransactionActivityItem"
import useRepositories from "hooks/useRepositories"
import useAuthenticationStore from "stores/useAuthenticationStore"
import UserInvestStateEnum from "entities/user/UserInvestStateEnum"
import useKYCStore from "stores/useKYCStore"

const { Title, Paragraph, Text, Link } = Typography

const ProjectPage: React.FC = () => {
  const {
    token: {
      colorPrimary,
      colorTextLightSolid,
      colorWarning,
      colorText,
      colorBgContainer,
    }
  } = theme.useToken()

  const kycStore = useKYCStore()
  const authenticationStore = useAuthenticationStore()

  const repositories = useRepositories()
  const { projectId } = useParams()

  const { data: userInfoData } = useQuery({
    queryKey: ['userinfo'],
    queryFn: () => repositories.authenticationRepository?.getUserInfo(),
    enabled: !!repositories.authenticationRepository?.getIsAuthenticated(),
  })
  const { data, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => repositories.projectRepository?.getProject(
      projectId as string
    )
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
      // invest logic
    }
  }, [authenticationStore, userInfoData, kycStore])

  const project = data?.data!;

  return (
    <MainLayout>
      {isLoading || data == null ? (
        <Card className="m-md">
          <Skeleton />
        </Card>
      ) : (
        <Layout>
          <Layout.Content style={{ overflowX: 'hidden', marginTop: '-1px', }}>
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
                  marginBottom: '180px',
                }}
              >
                {project.title}
              </Title>
            </Flex>
            <Card
              className="mx-md"
              bordered={false}
              bodyStyle={{
                padding: '16px',
                marginTop: '-130px',
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
                  <Text strong>{project.status}</Text>
                </Space>

                {!authenticationStore.token ? null : (
                  <Statistic
                    title="Your current position"
                    value={20}
                    precision={2}
                    decimalSeparator="."
                    prefix="$"
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
                          {userInfoData?.invest_state === UserInvestStateEnum.PENDING_KYC || userInfoData?.invest_state === UserInvestStateEnum.WALLET_VERIFIED ? (
                            <Space>
                              <Row justify="space-between">
                                <Col>
                                  <Text type="secondary">Amount</Text>
                                </Col>
                                <Col>
                                  <Text type="secondary">Balance: $999 USDC</Text>
                                </Col>
                              </Row>
                              <Flex
                                style={{
                                  backgroundColor: Colors.primaryLight,
                                  borderRadius: 4,
                                  padding: '8px',
                                }}
                                justify="space-between"
                              >
                                <Statistic
                                  value={33.78}
                                  precision={2}
                                  prefix="$"
                                />

                                <Button>
                                  MAX
                                </Button>
                              </Flex>

                              <Paragraph>
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
                        <Text>Withdraw Component</Text>
                      )
                    }
                  ]}
                />
              </Flex>
            </Card>

            <Flex
              vertical
              gap={16}
              style={{
                padding: '16px',
              }}>
              <Affix
                offsetTop={80}
              >
                <Anchor
                  affix={false}
                  direction="horizontal"
                  style={{
                    backgroundColor: colorBgContainer,
                    borderRadius: 8,
                    padding: 4,
                  }}
                  items={[
                    {
                      key: 'asset-overview',
                      href: '#asset-overview',
                      title: 'Asset Overview',
                    },
                    {
                      key: 'recent-activity',
                      href: '#recent-activity',
                      title: 'Recent Activity',
                    },
                  ]}
                />
              </Affix>

              <Flex vertical id="asset-overview">
                <Space direction="vertical" size={0}>
                  <Text type="secondary">Outstanding loan value</Text>
                  <Statistic
                    value={1341345.55}
                    precision={2}
                    prefix="$"
                    suffix={
                      <Text type="secondary" style={{ fontWeight: 400 }}>USDC</Text>
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
                    value={4587221.04}
                    precision={2}
                    prefix="$"
                    suffix={
                      <Text type="secondary" style={{ fontWeight: 400 }}>USDC</Text>
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
                    value={6.54}
                    precision={2}
                    prefix="$"
                    suffix={
                      <Text type="secondary" style={{ fontWeight: 400 }}>%</Text>
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
                  <Text type="secondary">Active loans</Text>
                  <Statistic
                    value={3}
                    suffix={
                      <Text type="secondary" style={{ fontWeight: 400 }}>Loans</Text>
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
                  <Text type="secondary">Idle pool liquidity</Text>
                  <Statistic
                    value={96}
                    precision={2}
                    prefix="$"
                    suffix={
                      <Text type="secondary" style={{ fontWeight: 400 }}>USDC</Text>
                    }
                    valueStyle={{
                      fontFamily: FontFamilies.primary,
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  />
                </Space>

                <Divider />

                <List
                  id="recent-activity"
                  itemLayout="horizontal"
                  dataSource={Array(10).fill(0)}
                  header={
                    <Title level={4}>
                      Recent Activity
                    </Title>
                  }
                  renderItem={(item, index) => (
                    <TransactionActivityItem />
                  )}
                />
              </Flex>


            </Flex>
          </Layout.Content>
        </Layout>
      )
      }
    </MainLayout >
  )
}

export default ProjectPage