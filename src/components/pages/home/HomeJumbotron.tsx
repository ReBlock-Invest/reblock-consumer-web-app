import { App, Button, Flex, Image, theme } from "antd"
import React from "react"
import { Typography } from 'antd'
import TrustedOverXUsers from "components/modules/users/TrustedOverXUsers"
import useWeb3 from "hooks/useWeb3"
import useAuthenticationStore from "stores/useAuthenticationStore"
import useResponsiveValue from "hooks/useResponsiveValue"

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

  const flexAlign = useResponsiveValue({
    xs: "center",
    sm: "center",
    md: "center",
    lg: "center",
    xl: "center",
    xxl: "flex-start",
  })
  const isShowReblockAppImage = useResponsiveValue({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: true,
  })

  return (
    <Flex vertical align="stretch" style={{backgroundColor: colorBgLayout}}>      
      <Flex
        className="p-lg"
        align={flexAlign as string}
        vertical
        gap={24}
        style={{
          backgroundColor: colorPrimary,
          backgroundImage: "url('/images/home-jumbotron-bg.svg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          marginTop: '-1px',
          position: 'relative',
          borderBottomLeftRadius: '48px',
          borderBottomRightRadius: '48px',
          overflow: 'hidden',
          marginRight: '-1px',
        }}
      >
        <Title level={2} className="text-center" style={{color: colorTextLightSolid}}>
          Real-world assets on your hand
        </Title>
        <Text className="text-center d-block" style={{color: colorTextLightSolid}}>
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
        <div className="mt-md">
          <TrustedOverXUsers />    
        </div>   
        
        {isShowReblockAppImage ? (
          <div style={{
            position: 'absolute',
            right: '128px',
            width: '250px',
            bottom: '0px',
            overflow: 'hidden',
            height: '380px',
          }}>
            <Image
              src="/images/reblock-app.png"
              alt="reblock-app"
              preview={false}
            />
          </div> 
        ) : null}          
      </Flex>
    </Flex>
  )
}

export default HomeJumbotron