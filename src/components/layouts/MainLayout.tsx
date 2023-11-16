import React, { ReactNode } from 'react'
import { Affix, App, Col, Flex, Image, Layout, Row, theme } from 'antd'
import { Link, useLocation } from "react-router-dom"
import useResponsiveValue from 'hooks/useResponsiveValue'
import ReblockIcon from 'components/common/ReblockIcon'
import useInterpolateScrollValue from 'hooks/useInterpolateScrollValue'

const { Header, Content, Footer } = Layout

type Props = {
  children: ReactNode
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const location = useLocation()
  const {
    token: { colorBgContainer, colorText, colorPrimary },
  } = theme.useToken()
  // const { notification } = App.useApp()

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
  const headerBurgerColor = useInterpolateScrollValue(
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

  return (    
    <App>
      <Layout className="layout">
        <Affix style={{backgroundColor: colorPrimary}}>
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
                <Flex align="center" justify="center" gap={8}>
                  {location.pathname !== "/" ? (
                    <Link to="/" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <ReblockIcon name="back" color={colorText} size={24} />
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
                </Flex>
              </Col>

              <Col>
                <Flex align="center" justify="center">
                  <ReblockIcon name="burger" color={`rgb(${headerBurgerColor}, ${headerBurgerColor}, ${headerBurgerColor})`} />
                </Flex>
              </Col>
            </Row>
          </Header>
        </Affix>
        <Content>
          <div className="site-layout-content" style={{ background: colorBgContainer }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Reblock © 2023. Made with ❤️ from Bali.
          Powered by <Link to="https://dashboard.internetcomputer.org/canister/fr33d-ayaaa-aaaal-adbpa-cai" target="_blank" rel="noopener noreferrer">
            <Image src="https://ljyte-qiaaa-aaaah-qaiva-cai.raw.ic0.app/be6d1595e958282d9ad760da6a40c1f8.svg" height={12} preview={false}></Image></Link>
        </Footer>
      </Layout>
    </App>
  )
}

export default MainLayout