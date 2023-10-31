import React from "react"
import MainLayout from "components/layouts/MainLayout"
import { Card, Carousel, Col, Image, Row, Skeleton, Space, Typography } from "antd"
import useRepositories from "hooks/useRepositories"
import { useQuery } from "react-query"
import { Link } from "react-router-dom"

const { Title, Text } = Typography

const HomePage: React.FC = () => {
  const repositories = useRepositories()

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
        <div style={{padding: '0px 50px 50px 50px'}}>
          <Title level={2}>Active Open Investments</Title>
          <Row gutter={16}>
            {data?.map((d, index) => (              
              <Col key={index} span={8}>
                <Link to={`/project/${d.id}`}>
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