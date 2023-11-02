import useRepositories from "hooks/useRepositories"
import { Button, Col, Row, Skeleton, Space, Typography } from "antd"
import MainLayout from "components/layouts/MainLayout"
import React from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import useResponsiveValue from "hooks/useResponsiveValue"

const { Title, Text } = Typography

const ProjectPage: React.FC = () => {
  const contentHorizontalPadding = useResponsiveValue({
    xs: 16,
    sm: 16,
    md: 16,
    lg: 50,
    xl: 50,
    xxl: 50,
  })

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
        <Space direction="vertical" size={16} style={{padding: `0px ${contentHorizontalPadding}px`}}>
          <Row>
            <Col>
              <Title level={1}>
                {data?.data?.title}
              </Title>
              <Text>{data?.data.description}</Text>
            </Col>
          </Row>

          <Button type="primary">Invest</Button>
        </Space>
      )}
    </MainLayout>
  )
}

export default ProjectPage