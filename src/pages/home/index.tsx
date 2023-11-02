import React from "react"
import MainLayout from "components/layouts/MainLayout"
import { Card, Carousel, Col, Image, Row, Skeleton, Space, Typography } from "antd"
import useRepositories from "hooks/useRepositories"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import useResponsiveValue from "hooks/useResponsiveValue"

const { Title, Text } = Typography

const HomePage: React.FC = () => {
  const repositories = useRepositories()

  const contentHorizontalPadding = useResponsiveValue({
    xs: 16,
    sm: 16,
    md: 16,
    lg: 50,
    xl: 50,
    xxl: 50,
  })

  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => repositories.projectRepository?.getProjects()
  })

  return (
    <MainLayout>
      <Carousel>
        <Image
          width="100vw"
          src="https://core.akseleran.com/media/banner/large/large-banner-75?0.690176091980137"
          preview={false}
        />
        <Image
          width="100vw"
          src="https://core.akseleran.com/media/banner/large/large-banner-74?0.5629297505720392"
          preview={false}
        />
        <Image
          width="100vw"
          src="https://core.akseleran.com/media/banner/large/large-banner-62?0.5594344313872379"
          preview={false}
        />
      </Carousel>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div style={{padding: `0px ${contentHorizontalPadding}px`}}>
          <Title level={2}>Active Open Investments</Title>
          <Row gutter={[16, 16]}>
            {data?.map((d, index) => (              
              <Col key={index} sm={24} lg={8} md={12}>
                <Link to={`/project/${d.key}`}>
                  <Card
                    cover={
                      <Image
                        alt="example"
                        src="https://api.akseleran.co.id/media/campaigns/banners/f91a420b57b55cc9a41dea39c9bebeefd26e59a681ac6f9222f0350104aa4558/Campaign_Header_550x420_EL_ExtraBunga.jpg"
                        preview={false}
                      />
                    }
                    hoverable
                  >
                    <Space direction="vertical" size={8} style={{width: '100%'}}>
                      <Row>
                        <Col span={12}>
                          <Space direction="vertical" size={4}>
                            <Text>Jumlah Pinjaman</Text>
                            <Text strong>Rp1.000.000</Text>
                          </Space>
                        </Col>
                        <Col span={12}>
                          <Space direction="vertical" size={4}>
                            <Text>Tenor</Text>
                            <Text strong>2 Bulan</Text>
                          </Space>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Space direction="vertical" size={4}>
                            <Text>Bunga Efektif</Text>
                            <Text strong>9,50%</Text>
                          </Space>
                        </Col>
                        <Col span={12}>
                          <Space direction="vertical" size={4}>
                            <Text>Angsuran</Text>
                            <Text strong>Tidak Ada</Text>
                          </Space>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Space direction="vertical" size={4}>
                            <Text>Frek. Angsuran Pokok</Text>
                            <Text strong>Bulanan</Text>
                          </Space>
                        </Col>
                        <Col span={12}>
                          <Space direction="vertical" size={4}>
                            <Text>Frek. Angsuran Bunga</Text>
                            <Text strong>Bulanan</Text>
                          </Space>
                        </Col>
                      </Row>
                    </Space>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </MainLayout>
  )
}

export default HomePage