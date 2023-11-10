import { App, Divider, Flex, Modal, Space, Spin, Typography } from "antd"
import useWalletConnect from "hooks/useWalletConnect"
import React from "react"

const { Text } = Typography

type Props = {
  open: boolean
  onCancel: () => void
}

const ConnectWalletModal: React.FC<Props> = ({open, onCancel}) => {
  const { message } = App.useApp()
  const {
    isLoading,
    connectMetaMask,
  } = useWalletConnect()

  return (
    <Modal title="Connect Your Wallet" open={open} onCancel={onCancel} footer={null}>
      {isLoading ? (
        <Flex align="center" justify="center" className="p-md">
          <Spin size="large" />
        </Flex>
      ) : (
        <Flex vertical style={{paddingTop: '16px'}}>
          <Space className="cursor-pointer" onClick={() => {
            connectMetaMask().then(() => {
              onCancel()
              message.success("Connected to MetaMask!")
            }).catch(() => {
              message.error("Failed to connect to MetaMask!")
            })
          }}>
            <img
              src="/images/logo-metamask.png"
              alt="logo-metamask"
            />
            <Text strong>Metamask</Text>
          </Space>
          <Divider/>
          <Space>
            <img
              src="/images/logo-wallet-connect.png"
              alt="logo-wallet-connect"
            />
            <Text strong>WalletConnect</Text>
          </Space>
          <Divider/>
          <Space>
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