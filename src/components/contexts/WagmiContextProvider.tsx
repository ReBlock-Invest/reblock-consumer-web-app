import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { ReactNode } from 'react'
import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet } from 'wagmi/chains'

/**
 * TODO:
 * - for Internet Computer. Need to create custom connector.
 *  - https://github.com/Connect2IC/connect2ic/blob/main/packages/core/src/providers/internet-identity.ts
 *  - Or bisa langsung pake ini: https://github.com/Connect2IC/connect2ic tapi dipisahin buttonnya.
 */

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
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',    
  ],
  includeWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',    
  ],
  customWallets: [
    {
      id: 'myCustomWallet',
      name: 'My Custom Wallet',
      homepage: 'www.mycustomwallet.com', // Optional
      image_url: 'my_custom_wallet_image', // Optional
      mobile_link: 'mobile_link', // Optional - Deeplink or universal
      desktop_link: 'desktop_link', // Optional - Deeplink
      webapp_link: 'webapp_link', // Optional
      app_store: 'app_store', // Optional
      play_store: 'play_store' // Optional
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