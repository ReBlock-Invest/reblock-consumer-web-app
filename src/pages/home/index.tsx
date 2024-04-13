import { Card, Col, Flex, Layout, Row, Segmented, Skeleton, Typography, theme } from "antd"
import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import HomeJumbotron from "components/pages/home/HomeJumbotron"
import MainLayout from "components/layouts/MainLayout"
import ProjectCard from "components/modules/projects/ProjectCard"
import React from "react"
import useServices from "hooks/useServices"

const {Title} = Typography

const HomePage: React.FC = () => {
  const services = useServices()

  const {
    token: {
      colorBgContainer,
    }
  } = theme.useToken()
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => services.projectService.getProjects()
  })

  return (
    <MainLayout>
      <HomeJumbotron />
    
      <Layout>
        <Layout.Content className="px-md pb-md">
          <Flex align="center" vertical className="mb-md">
            <Title level={3} className="w-100 text-center">Active Open Investments</Title>
            <Card className="p-0" bodyStyle={{padding: 4}}>
              <Segmented
                options={['All', 'ORI', 'ST', 'SBR']}
                style={{
                  backgroundColor: colorBgContainer,
                }}
              />
            </Card>
          </Flex>
          {isLoading ? (
            <Skeleton />
          ) : (
            <Row className="w-100 m-0" gutter={[8, 16]}>
              {data?.map((d, index) => (       
                <Col lg={8} md={24} sm={24} xs={24} key={d.key}>
                  <Link to={`/project/${d.key}`}>
                    <ProjectCard project={d.data} />
                  </Link>
                </Col>
              ))}
            </Row>
          )}
        </Layout.Content>
      </Layout>
    </MainLayout>
  )
}

export default HomePage