import React, { ReactNode, useMemo } from 'react';
import { App, Button, Col, ConfigProvider, Dropdown, Layout, Row, Space, theme } from 'antd';
import type { MenuProps } from 'antd';
import AppThemeConfig from 'components/themes/AppThemeConfig';
import useWalletAccount from 'hooks/useWalletAccount';

const { Header, Content, Footer } = Layout;

type Props = {
  children: ReactNode
}

const MainLayout: React.FC<Props> = ({children}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { notification } = App.useApp();

  const {handleLogin, handleLogout, walletAccount, walletAccountLoading} = useWalletAccount((_) => {
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
          <Header className="main-header">
            <Row justify="space-between">
              <Col>
                <span>Logo</span>
              </Col>

              <Col>
                {walletAccount ? (
                  <Dropdown menu={{ items, onClick: handleLogout }}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        Balance {walletAccount.balance}
                      </Space>
                    </a>
                  </Dropdown>
                ) : (
                  <Button type="primary" onClick={handleLogin} loading={walletAccountLoading}>Connect Wallet</Button>
                )}
              </Col>
            </Row>
          </Header>
          <Content>
            <div className="site-layout-content" style={{ background: colorBgContainer }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </App>
    </ConfigProvider>
  );
};

export default MainLayout;