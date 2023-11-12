import { Affix, Anchor, Avatar, Button, Card, Col, Divider, Flex, Layout, List, Row, Space, Statistic, Skeleton, Tabs, Tag, Typography, theme } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import Colors from "components/themes/Colors"
import FontFamilies from "components/themes/FontFamilies"
import MainLayout from "components/layouts/MainLayout"
import React from "react"
import TransactionActivityItem from "components/modules/transaction/TransactionActivityItem"
import useRepositories from "hooks/useRepositories"

const { Title, Paragraph, Text, Link } = Typography

const ProjectPage: React.FC = () => {
  const {
    token: {
      colorPrimary,
      colorTextLightSolid,
      colorWarning,
      colorText,
    }
  } = theme.useToken()

  const repositories = useRepositories()
  const { projectId } = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => repositories.projectRepository?.getProject(
      projectId as string
    )
  })

  const project = data?.data!;

  return (
    <MainLayout>
      {isLoading || data == null ? (
        <Skeleton />
      ) : (
        <Layout>
          <Layout.Content style={{overflowX: 'hidden'}}>
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
                height: '300px',
                paddingLeft: '150px',
                paddingRight: '150px',
              }}
            >
              <Title level={2} className="text-center" style={{ color: colorTextLightSolid }}>
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

                <Statistic
                  title="Your current position"
                  value={20}
                  precision={2}
                  decimalSeparator="."
                  prefix="$"
                />

                <Divider style={{ margin: 0 }} />

                <Tabs
                  defaultActiveKey="invest"
                  items={[
                    {
                      key: 'invest',
                      label: 'Invest',
                      children: (
                        <Flex vertical gap={8}>
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
                          <Button
                            type="primary"
                            size='large'
                            icon={<PlusOutlined />}
                          >
                            Invest
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
              <Affix offsetTop={0}>
                <Anchor
                  affix={false}
                  direction="horizontal"
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