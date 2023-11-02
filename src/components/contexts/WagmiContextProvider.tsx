import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { ReactNode } from 'react'
import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet } from 'wagmi/chains'

const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID as string

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: process.env.REACT_APP_PUBLIC_URL,
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({
  wagmiConfig, projectId, chains,
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', //metamask
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa', //coinbase wallet
    'c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a', //uniswap wallet
  ],
  includeWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', //metamask
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa', //coinbase wallet
    'c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a', //uniswap wallet
  ],
  customWallets: [
    {
      id: 'internet-computer',
      name: 'Internet Computer',
      homepage: 'identity.ic0.app/', // Optional
      image_url: 'https://cryptologos.cc/logos/internet-computer-icp-logo.png', // Optional
      mobile_link: 'https://identity.ic0.app/', // Optional - Deeplink or universal
      desktop_link: 'https://identity.ic0.app/', // Optional - Deeplink
      webapp_link: 'https://identity.ic0.app/', // Optional
      app_store: 'https://identity.ic0.app/', // Optional
      play_store: 'https://identity.ic0.app/' // Optional
    }
  ]
})

type Props = {
  children: ReactNode
}

const WagmiContextProvider: React.FC<Props> = ({children}) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      {children}
    </WagmiConfig>
  )
}

export default WagmiContextProvider