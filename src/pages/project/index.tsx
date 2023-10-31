import useRepositories from "hooks/useRepositories"
import { Button, Col, Row, Skeleton, Space, Typography } from "antd"
import MainLayout from "components/layouts/MainLayout"
import React from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"

const { Title, Text } = Typography

const ProjectPage: React.FC = () => {
  const repositories = useRepositories()
  const {projectId} = useParams()
  const { data, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => repositories.projectRepository?.getProject(
      projectId as string
    )
  })

  return (
    <MainLayout>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Space direction="vertical" size={16} style={{padding: '0px 50px 50px 50px'}}>
          <Row>
            <Col>
              <Title level={1}>
                {data?.title}
              </Title>
              <Text>{data?.description}</Text>
            </Col>
          </Row>

          <Button type="primary">Invest</Button>
        </Space>
      )}
    </MainLayout>
  )
}

export default ProjectPage