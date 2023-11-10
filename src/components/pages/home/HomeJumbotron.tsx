import { Button, Card, Flex, Statistic, theme } from "antd"
import React from "react"
import { Typography } from 'antd'
import TrustedOverXUsers from "components/modules/users/TrustedOverXUsers"

const { Title, Text } = Typography

type Props = {

}

const HomeJumbotron: React.FC<Props> = () => {
  const {
    token: {
      colorPrimary,
      colorTextLightSolid,
      colorBgLayout,
    }
  } = theme.useToken()

  return (
    <Flex vertical align="stretch" style={{backgroundColor: colorBgLayout}}>
      <Flex
        className="p-lg"
        align="center"
        vertical
        gap={24}
        style={{
          backgroundColor: colorPrimary,
          backgroundImage: "url('/images/home-jumbotron-bg.svg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Title level={2} className="text-center" style={{color: colorTextLightSolid}}>
          Real-world assets on your hand
        </Title>
        <Text className="text-center w-100 d-block" style={{color: colorTextLightSolid}}>
          Wafer tiramisu chocolate cake apple pie tootsie roll I love jelly beans wafer halvah.
        </Text>
        <Button size="large">Connect Wallet</Button>
        <TrustedOverXUsers />        
      </Flex>

      <div>
        <div
          style={{
            backgroundColor: colorPrimary,
            width: '100%',
            height: '50px',
            marginBottom: '-100px',
            marginTop: '-2px',
            borderBottomRightRadius: 100,
            borderBottomLeftRadius: 100,
          }}
        />
      </div>

      <Card className="mx-md" bordered={false} bodyStyle={{padding: '16px'}}>
        <Statistic
          title="Active loans amount"
          value={143654323}
          decimalSeparator=","
          prefix="$"
          valueStyle={{
            fontFamily: "Red Rose",
          }}
        />
      </Card>    
    </Flex>
  )
}

export default HomeJumbotron