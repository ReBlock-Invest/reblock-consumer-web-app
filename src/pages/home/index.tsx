import React from "react"
import MainLayout from "components/layouts/MainLayout"
import HomeJumbotron from "components/pages/home/HomeJumbotron"
import { Flex, Layout, Typography } from "antd"

const {Title} = Typography

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <HomeJumbotron />
    
      <Layout>
        <Layout.Content className="px-md">
          <Flex vertical align="center">
            <Title level={3}>Active Open Investments</Title>
          </Flex>
        </Layout.Content>
      </Layout>
    </MainLayout>
  )
}

export default HomePage