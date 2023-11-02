import React, { ReactNode, useMemo } from 'react'
import { App, Button, Col, ConfigProvider, Dropdown, Layout, Row, Space, theme } from 'antd'
import type { MenuProps } from 'antd'
import AppThemeConfig from 'components/themes/AppThemeConfig'
import useWagmiAuthentication from 'hooks/useWagmiAuthentication'
import useWalletStore from 'stores/useWalletStore'
import useResponsiveValue from 'hooks/useResponsiveValue'

const { Header, Content, Footer } = Layout

type Props = {
  children: ReactNode
}

const MainLayout: React.FC<Props> = ({children}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const { notification } = App.useApp()

  const contentHorizontalPadding = useResponsiveValue({
    xs: 16,
    sm: 16,
    md: 16,
    lg: 50,
    xl: 50,
    xxl: 50,
  })

  const walletStore = useWalletStore()

  const {
    handleLogin: handleLoginWagmi, 
    handleLogout: handleLogoutWagmi,
  } = useWagmiAuthentication((_) => {
    notification.error({
      message: `Ooops!`,
      description: 'Failed to connect to your wallet',
      placement: 'bottomRight',
    })
  })

  const items: MenuProps['items'] = useMemo(() => [
    {
      label: 'Logout',
      key: '1',
      danger: true,
    },
  ], [])

  return (
    <ConfigProvider theme={AppThemeConfig}>
      <App>
        <Layout className="layout">
          <Header className="main-header" style={{padding: `0px ${contentHorizontalPadding}px`}}>
            <Row justify="space-between">
              <Col>
                <span>Reblock</span>
              </Col>

              <Col>
                {walletStore.balance ? (
                  <Dropdown menu={{ items, onClick: handleLogoutWagmi }}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        Balance {walletStore.balance}
                      </Space>
                    </a>
                  </Dropdown>
                ) : (
                  <Button type="primary" onClick={handleLoginWagmi} loading={walletStore.isLoading}>Connect Wallet</Button>
                )}
              </Col>
            </Row>
          </Header>
          <Content>
            <div className="site-layout-content" style={{ background: colorBgContainer }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Reblock © 2023</Footer>
        </Layout>
      </App>
    </ConfigProvider>
  )
}

export default MainLayout