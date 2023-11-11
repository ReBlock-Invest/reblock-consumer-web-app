import { Avatar, Card, Col, Flex, Progress, Row, Space, Statistic, Tag, Typography, theme } from "antd"
import Colors from "components/themes/Colors"
import Project from "entities/project/Project"
import React from "react"

const { Text, Title } = Typography

type Props = {
  project: Project
}

const ProjectCard: React.FC<Props> = ({project}) => {
  const {
    token: {
      colorWarning,
      colorText,
    },
  } = theme.useToken()
  return (
    <Card bordered={false} bodyStyle={{padding: '16px'}}>
      <Flex vertical gap={16}>
        <Row justify="space-between">
          <Col>
            <Space direction="vertical">
              <Space>
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                <Tag color="white" style={{backgroundColor: colorWarning, color: colorText}} bordered={false}>Rating {project.credit_rating}</Tag>
              </Space>
              <Text type="secondary">{project.issuer_description}</Text>
            </Space>
          </Col>
          <Col>
            <Space direction="vertical" align="end">
              <Text type="secondary">APR</Text>
              <Text strong>{project.APR}</Text>
            </Space>
          </Col>
        </Row>

        <Title level={4} className="m-0">{project.title}</Title>

        <div>
          <Statistic
            value={1341345}
            title="Total loan amount"
            prefix="$"
            valueStyle={{
              fontFamily: "Red Rose",
              fontSize: '30px',
            }}
          />

          <Progress percent={75} strokeColor={{
            '0%': Colors.secondary,
            '100%': Colors.primary
            }}
            showInfo={false}
          />
        </div>

        <Row justify="space-between">
          <Col>
            <Space direction="vertical">
              <Text type="secondary">Maturity date</Text>
              <Title level={5} className="m-0">Nov 31, 2024</Title>
            </Space>
          </Col>
          <Col>
            <Space direction="vertical">
              <Text type="secondary">Status</Text>
              <Title level={5} className="m-0">{project.status}</Title>
            </Space>
          </Col>
        </Row>
      </Flex>
    </Card>
  )
}

export default ProjectCard