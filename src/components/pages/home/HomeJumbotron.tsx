import { App, Button, Card, Flex, Statistic, theme } from "antd"
import React from "react"
import { Typography } from 'antd'
import TrustedOverXUsers from "components/modules/users/TrustedOverXUsers"
import useWeb3 from "hooks/useWeb3"
import useAuthenticationStore from "stores/useAuthenticationStore"

const { Title, Text } = Typography

type Props = {

}

const HomeJumbotron: React.FC<Props> = () => {
  const {message} = App.useApp()  
  const {
    token: {
      colorPrimary,
      colorTextLightSolid,
      colorBgLayout,
    }
  } = theme.useToken()
  const { isLoading, disconnect } = useWeb3()
  const authenticationStore = useAuthenticationStore()

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
          Generate passive income secured by real-world assets around the globe
        </Text>
        <Button
          size="large"
          loading={authenticationStore.isLoading || isLoading}
          onClick={() => {
            if (!authenticationStore.token) {
              authenticationStore.setIsShowConnectWalletModal(true)
            } else {
              disconnect().then(() => {
                message.success("Disconnected from Wallet!")
              }).catch(() => {
                message.error("Failed to disconnect from Wallet!")
              })
            }
          }}
        >
          {!!authenticationStore.token ? "Disconnect" : "Connect Wallet"}
        </Button>
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