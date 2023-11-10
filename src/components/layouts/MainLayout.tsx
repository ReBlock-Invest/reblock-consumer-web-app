import React, { ReactNode } from 'react'
import { App, Col, Flex, Image, Layout, Row, theme } from 'antd'
// import type { MenuProps } from 'antd'
import { Link, useLocation } from "react-router-dom"
// import useWagmiAuthentication from 'hooks/useWagmiAuthentication'
// import useWalletStore from 'stores/useWalletStore'
import useResponsiveValue from 'hooks/useResponsiveValue'
import ReblockIcon from 'components/common/ReblockIcon'

const { Header, Content, Footer } = Layout

type Props = {
  children: ReactNode
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const location = useLocation()
  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken()
  // const { notification } = App.useApp()

  const contentHorizontalPadding = useResponsiveValue({
    xs: 16,
    sm: 16,
    md: 16,
    lg: 50,
    xl: 50,
    xxl: 50,
  })

  // const walletStore = useWalletStore()

  // const {
  //   handleLogin: handleLoginWagmi,
  //   handleLogout: handleLogoutWagmi,
  // } = useWagmiAuthentication((_) => {
  //   notification.error({
  //     message: `Ooops!`,
  //     description: 'Failed to connect to your wallet',
  //     placement: 'bottomRight',
  //   })
  // })

  // const items: MenuProps['items'] = useMemo(() => [
  //   {
  //     label: 'Logout',
  //     key: '1',
  //     danger: true,
  //   },
  // ], [])

  console.log('debug1', location)

  return (    
    <App>
      <Layout className="layout">
        <Header className="main-header" style={{ padding: `0px ${contentHorizontalPadding}px` }}>
          <Row justify="space-between" align="middle" className="h-100">
            <Col>
              <Flex align="center" gap={8}>
                {location.pathname !== "/" ? (
                  <Link to="/" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <ReblockIcon name="back" color={colorText} size={24} />
                  </Link>
                ) : null}
                <img
                  src="/images/logo-dark.svg"
                  style={{width: '128px'}}
                  alt="logo"
                />
              </Flex>
            </Col>

            <Col>
              <Flex align="center" justify="center">
                <ReblockIcon name="burger" />
              </Flex>
            </Col>
          </Row>
        </Header>
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