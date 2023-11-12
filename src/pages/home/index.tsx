import { Col, Layout, Row, Skeleton, Typography } from "antd"
import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import HomeJumbotron from "components/pages/home/HomeJumbotron"
import MainLayout from "components/layouts/MainLayout"
import ProjectCard from "components/modules/projects/ProjectCard"
import React, { useEffect } from "react"
import useRepositories from "hooks/useRepositories"

const {Title} = Typography

const HomePage: React.FC = () => {
  const repositories = useRepositories()

  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => repositories.projectRepository?.getProjects()
  })

  return (
    <MainLayout>
      <HomeJumbotron />
    
      <Layout>
        <Layout.Content className="px-md">
          <Title level={3} className="w-100 text-center">Active Open Investments</Title>
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