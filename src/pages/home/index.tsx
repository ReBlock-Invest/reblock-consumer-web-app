import React from "react"
import MainLayout from "components/layouts/MainLayout"
import HomeJumbotron from "components/pages/home/HomeJumbotron"
import { Col, Layout, Row, Typography } from "antd"
import ProjectCard from "components/modules/projects/ProjectCard"
import { Link } from "react-router-dom"

const {Title} = Typography

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <HomeJumbotron />
    
      <Layout>
        <Layout.Content className="px-md">
          <Title level={3} className="w-100 text-center">Active Open Investments</Title>
          <Row className="w-100 m-0" gutter={[8, 16]}>            
            <Col lg={8} md={24} sm={24} xs={24}>
              <Link to="/project/xxx">
                <ProjectCard />
              </Link>
            </Col>
            <Col lg={8} md={24} sm={24} xs={24}>
              <Link to="/project/xxx">
                <ProjectCard />
              </Link>
            </Col>
            <Col lg={8} md={24} sm={24} xs={24}>
              <Link to="/project/xxx">
                <ProjectCard />
              </Link>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </MainLayout>
  )
}

export default HomePage