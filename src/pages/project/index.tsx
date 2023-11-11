import { PlusOutlined } from "@ant-design/icons"
import { Affix, Anchor, Avatar, Button, Card, Col, Divider, Flex, List, Row, Space, Statistic, Tabs, Tag, Typography, theme } from "antd"
import MainLayout from "components/layouts/MainLayout"
import TransactionActivityItem from "components/modules/transaction/TransactionActivityItem"
import Colors from "components/themes/Colors"
import FontFamilies from "components/themes/FontFamilies"
import React from "react"

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

  return (
    <MainLayout>
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
      <Title level={2} className="text-center"  style={{color: colorTextLightSolid}}>
        Saving Bond Ritel (SBR)
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
        SBR is a retail investment instrument in the form of Indonesia goverment bonds that has characteristics similar to saving or bank deposits.
      </Paragraph>
      <Flex vertical gap={16}>
        <Row justify="space-between">
          <Col>
            <Space direction="vertical">
              <Space>
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                <Tag color="white" style={{backgroundColor: colorWarning, color: colorText}} bordered={false}>Rating A</Tag>
              </Space>
              <Text type="secondary">Indonesia Ministry of Finance</Text>
            </Space>
          </Col>
          <Col>
            <Space direction="vertical" align="end">
              <Text type="secondary">APR</Text>
              <Text strong>5.2%</Text>
            </Space>
          </Col>
        </Row>

        <Space direction="vertical" size={0}>
          <Text type="secondary">Loan term</Text>
          <Text strong>12 Months</Text>
        </Space>

        <Row>
          <Col>
            <Space direction="vertical" size={0}>
              <Text type="secondary">Liquidity</Text>
              <Text strong>Quarterly</Text>
            </Space>
          </Col>
          <Col>
            <Space direction="vertical" size={0}>
              <Text type="secondary">Status</Text>
              <Text strong>Open</Text>
            </Space>
          </Col>
        </Row>

        <Statistic
          title="Your current position"
          value={20}
          precision={2}
          decimalSeparator="."
          prefix="$"
        />

        <Divider style={{margin: 0}}/>
        
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
      <Affix offsetTop={0}>
        <Anchor
          affix={false}
          style={{backgroundColor: colorBgContainer}}
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
        <Paragraph>
          Phasellus tellus nisl, lacinia ut ex id, auctor vestibulum quam. Morbi blandit gravida nisl et tincidunt. Aliquam in condimentum augue. Vivamus ac diam ultricies nibh tristique pulvinar. Nullam ut ligula id augue ullamcorper viverra nec vel tortor. Nullam at nisl augue. Mauris suscipit metus ac nulla euismod, sit amet tincidunt turpis fermentum.
        </Paragraph>

        <Paragraph>
          Phasellus purus purus, vulputate non lacus vehicula, tincidunt facilisis eros. Suspendisse sagittis sodales elit, vitae dapibus felis facilisis vitae. Vivamus sed fringilla augue. Maecenas ac porttitor sapien.
        </Paragraph>

        <Divider />
        
        <Space direction="vertical" size={0}>
          <Text type="secondary">Outstanding loan value</Text>
          <Statistic
            value={1341345.55}
            precision={2}
            prefix="$"
            suffix={
              <Text type="secondary" style={{fontWeight: 400}}>USDC</Text>
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
              <Text type="secondary" style={{fontWeight: 400}}>USDC</Text>
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
              <Text type="secondary" style={{fontWeight: 400}}>%</Text>
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
              <Text type="secondary" style={{fontWeight: 400}}>Loans</Text>
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
              <Text type="secondary" style={{fontWeight: 400}}>USDC</Text>
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
     </Card>
    </MainLayout>
  )
}

export default ProjectPage