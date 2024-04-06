import React, { ReactNode, useState } from 'react';
import {
  FolderOpenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, App, Flex } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import ReblockIcon from 'components/common/ReblockIcon';
import useInterpolateScrollValue from 'hooks/useInterpolateScrollValue';

const { Header, Sider, Content } = Layout;

type Props = {
  children: ReactNode
}

const AdminLayout: React.FC<Props> = ({children}) => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const headerIconColor = useInterpolateScrollValue(
    255,
    0,
    0,
    50
  )

  const headerBackgroundOpacity = useInterpolateScrollValue(
    0,
    1,
    0,
    50
  )

  return (
    <App>
      <Layout className='layout' style={{height: '100vh'}}>
        <Sider trigger={null}>
          <Flex vertical>
            <Flex align="center" justify="center" style={{position: 'relative', width: '100%', height: '64px'}}>
              <img
                src="/images/logo-dark.svg"
                style={{width: '128px', position: 'absolute', zIndex: 2, top: 20, left: 16, right: 0, opacity: headerBackgroundOpacity}}
                alt="logo"
              />
              <img
                src="/images/logo-light.svg"
                style={{width: '128px', position: 'absolute', zIndex: 1, top: 20, left: 16, right: 0}}
                alt="logo"
              />
            </Flex>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}

              items={[
                {
                  key: '1',
                  icon: <FolderOpenOutlined />,
                  label: 'Projects',
                },
              ]}
            />
          </Flex>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Flex
            style={{
              overflowY: 'scroll',
            }}
          >
            <Content
              style={{
                margin: '16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </Content>
          </Flex>
        </Layout>
      </Layout>
    </App>
  );
};

export default AdminLayout;