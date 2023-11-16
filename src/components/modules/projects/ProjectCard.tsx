import { Avatar, Button, Card, Col, Flex, Progress, Row, Space, Statistic, Tag, Typography, theme } from "antd"
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
      colorSuccess,
      colorSuccessBg,
    },
  } = theme.useToken()
  return (
    <Card bordered={false} bodyStyle={{padding: '16px'}}>
      <Flex vertical gap={16}>
        <Row justify="space-between">
          <Col>
            <Space direction="vertical">
              <Space>
                <Avatar src={project.issuer_picture} />
                <Tag color="white" style={{backgroundColor: colorWarning, color: colorText}} bordered={false}>Rating {project.credit_rating}</Tag>
              </Space>
              <Text type="secondary">{project.issuer_description}</Text>
            </Space>
          </Col>
          <Col>
            <Space
              direction="vertical"
              align="end"
              style={{
                backgroundColor: colorSuccessBg,
              }}
              className="p-sm br-sm"
            >
              <Text type="secondary">APR</Text>
              <Text strong style={{color: colorSuccess}}>{project.APR}</Text>
            </Space>
          </Col>
        </Row>

        <Title level={4} className="m-0">{project.title}</Title>

        <div>
          <Statistic
            value={project.total_loan_amount}
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
            <Space
              direction="vertical"
              align="end"              
            >
              <Text type="secondary">Status</Text>
              <Text
                strong
                className="m-0 p-sm br-sm"
                style={{
                  color: colorSuccess,
                  backgroundColor: colorSuccessBg
                }}
              >{project.status}</Text>
            </Space>
          </Col>
        </Row>

        <Button type="primary">
            See More
        </Button>
      </Flex>
    </Card>
  )
}

export default ProjectCard