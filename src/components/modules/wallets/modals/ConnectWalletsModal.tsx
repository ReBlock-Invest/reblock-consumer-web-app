import { Divider, Flex, Modal, Space, Spin, Typography } from "antd"
import useWalletConnect from "hooks/useWeb3"
import React from "react"
import useAuthenticationStore from "stores/useAuthenticationStore"

const { Text } = Typography

type Props = {}

const ConnectWalletModal: React.FC<Props> = () => {
  const {
    isLoading,
    connectMetaMask,
    connectCoinbase,
    connectWalletConnect,
  } = useWalletConnect()

  const { isShowConnectWalletModal, setIsShowConnectWalletModal} = useAuthenticationStore()

  return (
    <Modal
      title="Connect Your Wallet"
      open={isShowConnectWalletModal}
      onCancel={() => setIsShowConnectWalletModal(false)}
      footer={null}
    >
      {isLoading ? (
        <Flex align="center" justify="center" className="p-md">
          <Spin size="large" />
        </Flex>
      ) : (
        <Flex vertical style={{paddingTop: '16px'}}>
          <Space
            className="cursor-pointer"
            onClick={() => {
              connectMetaMask()
              setIsShowConnectWalletModal(false)
            }}
          >
            <img
              src="/images/logo-metamask.png"
              alt="logo-metamask"
            />
            <Text strong>Metamask</Text>
          </Space>
          <Divider/>
          <Space
            className="cursor-pointer"
            onClick={() => {
              connectWalletConnect()
              setIsShowConnectWalletModal(false)
            }}
          >
            <img
              src="/images/logo-wallet-connect.png"
              alt="logo-wallet-connect"
            />
            <Text strong>WalletConnect</Text>
          </Space>
          <Divider/>
          <Space
            className="cursor-pointer"
            onClick={() => {
              connectCoinbase()
              setIsShowConnectWalletModal(false)
            }}
          >
            <img
              src="/images/logo-coinbase.png"
              alt="logo-coinbase"
            />
            <Text strong>Coinbase</Text>
          </Space>
        </Flex>
      )}
    </Modal>
  )
}

export default ConnectWalletModal