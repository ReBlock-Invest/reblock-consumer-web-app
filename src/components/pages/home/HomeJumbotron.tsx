import { App, Button, Card, Flex, Statistic, theme } from "antd"
import React, { useState } from "react"
import { Typography } from 'antd'
import TrustedOverXUsers from "components/modules/users/TrustedOverXUsers"
import PersonalInquiryModal from "components/modules/kyc/modals/PersonaInquiryModal"
import useKYCStore from "stores/useKYCStore"
import useWeb3 from "hooks/useWeb3"
import ConnectWalletModal from "components/modules/wallets/modals/ConnectWalletsModal"
import useAuthenticationStore from "stores/useAuthenticationStore"

const { Title, Text } = Typography

type Props = {

}

const HomeJumbotron: React.FC<Props> = () => {
  const {message} = App.useApp()
  const [showPersonaInquiryModal, setShowPersonaInquiryModal] = useState(false)
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false)
  const {
    token: {
      colorPrimary,
      colorTextLightSolid,
      colorBgLayout,
    }
  } = theme.useToken()
  const kycStore = useKYCStore()
  const { accounts, isLoading, disconnect } = useWeb3()
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
        <PersonalInquiryModal
          open={showPersonaInquiryModal}
          onComplete={(data) => {
            message.success("Congratulations! KYC Step is completed!")
            kycStore.setData(true, data)
          }}
          onError={() => {
            message.error("Ooops! KYC Step is failed!")
            kycStore.setData(false, null)
          }}
          onCancel={() => setShowPersonaInquiryModal(false)}
        />
        <ConnectWalletModal
          open={showConnectWalletModal}
          onCancel={() => setShowConnectWalletModal(false)}
        />
        <Button
          size="large"
          loading={authenticationStore.isLoading || isLoading}
          onClick={() => {
            if (!accounts) {
              setShowConnectWalletModal(true)
            } else {
              disconnect().then(() => {
                message.success("Disconnected from Wallet!")
              }).catch(() => {
                message.error("Failed to disconnect from Wallet!")
              })
            }
          }}
        >
          {accounts ? "Disconnect" : "Connect Wallet"}
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