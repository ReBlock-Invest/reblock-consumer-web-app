import React, { ReactNode, useState } from 'react'
import { Affix, App, Button, Col, ConfigProvider, Divider, Drawer, Dropdown, Flex, Form, Image, Input, Layout, Menu, Row, Typography, theme } from 'antd'
import { Link, useLocation } from "react-router-dom"
import useResponsiveValue from 'hooks/useResponsiveValue'
import ReblockIcon from 'components/common/ReblockIcon'
import useInterpolateScrollValue from 'hooks/useInterpolateScrollValue'
import useWeb3 from 'hooks/useWeb3'
import useAuthenticationStore from 'stores/useAuthenticationStore'
import Colors from 'components/themes/Colors'
import FormItem from 'antd/es/form/FormItem'
import { CaretDownOutlined } from '@ant-design/icons'
import { AuthProviderEnum } from 'types'

const { Text, Link: AntdLink } = Typography
const { Header, Content, Footer } = Layout

type Props = {
  children: ReactNode
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const location = useLocation()
  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken()
  const { message } = App.useApp()
  const { isLoading, disconnect, isActive } = useWeb3()
  const authenticationStore = useAuthenticationStore()

  const [isOpenRightDrawer, setIsOpenRightDrawer] = useState(false)

  const headerBackgroundOpacity = useInterpolateScrollValue(
    0,
    1,
    0,
    50
  )
  const headerShadowOpacity = useInterpolateScrollValue(
    0,
    0.1,
    0,
    50
  )
  const headerIconColor = useInterpolateScrollValue(
    255,
    0,
    0,
    50
  )

  const contentHorizontalPadding = useResponsiveValue({
    xs: 16,
    sm: 16,
    md: 16,
    lg: 50,
    xl: 50,
    xxl: 50,
  })

  const isMenuCollapsed = useResponsiveValue({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: false,
    xxl: false,
  })

  return (    
    <App>
      <Layout className="layout">
        <Affix style={{backgroundColor: colorPrimary, marginRight: '-1px'}}>
          <Header
            className="main-header"
            style={{
              padding: `0px ${contentHorizontalPadding}px`,
              backgroundColor: `rgba(255,255,255, ${headerBackgroundOpacity})`,
              boxShadow: `0 2px 4px rgba(0, 0, 0, ${headerShadowOpacity})`,
              zIndex: 2,
            }}
          >
            <Row justify="space-between" align="middle" className="h-100">
              <Col style={{height: '100%'}}>
                <Flex align="center" gap={8} style={{height: '100%'}}>
                  {location.pathname !== "/" ? (
                    <Link to="/" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <ReblockIcon name="back" color={`rgb(${headerIconColor}, ${headerIconColor}, ${headerIconColor})`} size={24} />
                    </Link>
                  ) : null}
                  <div style={{position: 'relative', width: '128px', height: '100%'}}>
                    <img
                      src="/images/logo-dark.svg"
                      style={{width: '128px', position: 'absolute', zIndex: 2, top: 20, left: 0, right: 0, opacity: headerBackgroundOpacity}}
                      alt="logo"
                    />
                    <img
                      src="/images/logo-light.svg"
                      style={{width: '128px', position: 'absolute', zIndex: 1, top: 20, left: 0, right: 0}}
                      alt="logo"
                    />
                  </div>

                  {!isMenuCollapsed ? (
                    <ConfigProvider
                      theme={{
                        components: {
                          Menu: {
                            itemColor: `${headerBackgroundOpacity ? colorPrimary : 'white'} !important`,
                            itemSelectedColor: `${headerBackgroundOpacity ? colorPrimary : 'white'} !important`,
                          }
                        }
                      }}
                    >
                      <Menu
                        style={{
                          backgroundColor: `rgba(255,255,255, 0)`,
                          zIndex: 2,                        
                        }}
                        mode="horizontal"
                        items={[
                          {
                            key: '/about',
                            label: 'About',
                          },
                          {
                            key: '/community',
                            label: 'Community',
                          },
                        ]}
                      />
                    </ConfigProvider>
                  ) : null}
                </Flex>
              </Col>

              <Col>
                {isMenuCollapsed ? (
                  <Flex align="center" justify="center">
                    <div onClick={() => setIsOpenRightDrawer(!isOpenRightDrawer)} className='cursor-pointer'>
                      <ReblockIcon
                        name="burger"
                        color={`rgb(${headerIconColor}, ${headerIconColor}, ${headerIconColor})`}
                      />
                    </div>
                  </Flex>
                ) : (
                  <Flex align="center" gap={8}>  
                    {!isActive || authenticationStore.selectedAuthProvider !== AuthProviderEnum.ICP ? (
                       <Button
                        size="large"
                        loading={authenticationStore.isLoading || isLoading}
                        onClick={() => {
                          if (!authenticationStore.token) {
                            authenticationStore.setIsShowConnectWalletModal(true)
                          } else {
                            disconnect().then(() => {
                              message.success("Disconnected from Wallet!")
                            }).catch(() => {
                              message.error("Failed to disconnect from Wallet!")
                            })
                          }
                        }}
                      >
                        {!!authenticationStore.token ? "Disconnect" : "Connect Wallet"}
                      </Button>
                    ) : null}                                     
                    <Dropdown.Button 
                      size="large"
                      menu={{
                        items: [
                          {
                            key: 'ICP',
                            label: 'ICP',
                            onClick: () => authenticationStore.setSelectedAuthProvider(
                              AuthProviderEnum.ICP,
                            )
                          },
                          {
                            key: 'EVM',
                            label: 'EVM',
                            onClick: () => authenticationStore.setSelectedAuthProvider(
                              AuthProviderEnum.EVM,
                            )
                          },                          
                        ]
                      }}
                      icon={
                        <CaretDownOutlined />
                      }
                    >
                      {authenticationStore.selectedAuthProvider}
                    </Dropdown.Button>
                  </Flex>
                )}                
              </Col>
            </Row>
          </Header>
        </Affix>
        <Drawer
          title="Main Menu"
          placement="right"
          closable
          onClose={() => setIsOpenRightDrawer(false)}
          open={isOpenRightDrawer}
        >
          <Flex vertical>
              <Text strong>About</Text>
              <Divider />
              <Text strong>Community</Text>
              {!isActive || authenticationStore.selectedAuthProvider !== AuthProviderEnum.ICP ? (
                <Button
                  type="primary"
                  size="large"
                  className="mt-lg"
                  loading={authenticationStore.isLoading || isLoading}
                  onClick={() => {
                    if (!authenticationStore.token) {
                      authenticationStore.setIsShowConnectWalletModal(true)
                    } else {
                      disconnect().then(() => {
                        message.success("Disconnected from Wallet!")
                      }).catch(() => {
                        message.error("Failed to disconnect from Wallet!")
                      })
                    }
                  }}
                >
                  {!!authenticationStore.token ? "Disconnect" : "Connect Wallet"}
                </Button>
              ) : null}
          </Flex>
        </Drawer>
        <Content>
          <div style={{ background: colorBgContainer }}>
            {children}
          </div>
        </Content>
        <Footer style={{
          position: 'relative',
          backgroundImage: "url('/images/bg-ellipse.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right',
          padding: 0,
          backgroundSize: 'cover',
        }}>
          <ConfigProvider
            theme={{
              token: {
                colorText: colorBgContainer,                
              },
              components: {
                Divider: {
                  colorSplit: colorBgContainer,
                },
                Typography: {
                  colorLink: colorBgContainer,
                  colorLinkActive: colorBgContainer,
                  colorLinkHover: Colors.primaryLight,
                },
                Input: {
                  colorText: Colors.content,
                }
              }
            }}
          >
            <Flex vertical
              style={{
                paddingRight: contentHorizontalPadding as number,
                paddingLeft: contentHorizontalPadding as number,
                paddingTop: 32,
              }}
            >
              <Row gutter={[16, 32]}>
                <Col lg={4} xxl={4} xl={4} xs={24}>
                  <img
                    src="/images/logo-light.svg"
                    style={{width: '128px'}}
                    alt="logo"
                  />
                </Col>
                <Col lg={4} xxl={4} xl={4} xs={24}>
                  <Flex vertical gap={8}>
                    <Text strong>Legal</Text>
                    <AntdLink href="#">Terms of Use</AntdLink>
                    <AntdLink href="/privacy-policy">Privacy Policy</AntdLink>
                  </Flex>
                </Col>
                <Col lg={6} xxl={6} xl={6} xs={24}>
                  <Flex vertical gap={8}>
                    <Text strong>Get in touch</Text>
                    <AntdLink href="#">Press: press@reblock.finance</AntdLink>
                    <AntdLink href="#">Partnership: bizdev@reblock.finance</AntdLink>
                  </Flex>
                </Col>
                <Col lg={10} xxl={10} xl={10} xs={24}>
                  <Flex vertical gap={8}>
                    <Text strong>Early birds get the alpha.</Text>
                    <Text>Sign up for weekly ReBlock updates</Text>
                    <Form>
                      <FormItem>
                        <Input
                          type="email"
                          placeholder="Enter Email Address"
                          suffix={
                            <Button type="primary" htmlType="submit">
                              Sign Up
                            </Button>
                          }
                        />
                      </FormItem>
                    </Form>
                  </Flex>
                </Col>
              </Row>

              <Divider type="horizontal" style={{opacity: 0.5}} />
              
              <Flex align="center" justify="center" gap={8} className="mb-md">
                <Text style={{color: colorBgContainer}}>ReBlock © 2024. Made with ❤️ from Bali. Powered by</Text>
                <Link
                  to="https://dashboard.internetcomputer.org/canister/rugve-6qaaa-aaaal-ajafq-cai" target="_blank" rel="noopener noreferrer"
                  style={{marginTop: '8px'}}
                >
                  <Image src="/images/logo-icp.png" height={18} preview={false}></Image>
                </Link>
              </Flex>
            </Flex>
          </ConfigProvider>
        </Footer>
      </Layout>
    </App>
  )
}

export default MainLayout