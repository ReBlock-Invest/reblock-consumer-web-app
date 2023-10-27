import React, { ReactNode } from 'react';
import { Button, Col, ConfigProvider, Layout, Row, theme } from 'antd';
import type { MenuProps } from 'antd';
import AppThemeConfig from 'components/themes/AppThemeConfig';

const { Header, Content, Footer } = Layout;

type Props = {
  children: ReactNode
}

const menus: MenuProps['items'] = [
  {
    key: 'beri-pinjaman',
    label: 'Beri Pinjaman',
  },
  {
    key: 'ajukan-pinjaman',
    label: 'Ajukan Pinjaman',
  },
];

const MainLayout: React.FC<Props> = ({children}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <ConfigProvider theme={AppThemeConfig}>
      <Layout className="layout">
        <Header className="main-header">
          <Row justify="space-between">
            <Col>
              <span>Logo</span>
            </Col>

            <Col>
              <Button type="primary">Connect Wallet</Button>
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
    </ConfigProvider>
  );
};

export default MainLayout;