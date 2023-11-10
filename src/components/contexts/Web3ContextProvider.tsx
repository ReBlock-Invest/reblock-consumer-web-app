import type { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import type { WalletConnect } from '@web3-react/walletconnect-v2'

import { coinbaseWallet, hooks as coinbaseWalletHooks } from 'lib/web3/connectors/coinbaseWallet'
import { hooks as metaMaskHooks, metaMask } from 'lib/web3/connectors/metaMask'
import { hooks as walletConnectHooks, walletConnect } from 'lib/web3/connectors/walletConnect'
import { ReactNode } from 'react'

const connectors: [MetaMask | WalletConnect | WalletConnect | CoinbaseWallet, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [coinbaseWallet, coinbaseWalletHooks],
]

type Props = {
  children: ReactNode
}

const Web3ContextProvider: React.FC<Props> = ({children}) => {
  return (
    <Web3ReactProvider connectors={connectors}>
      {children}
    </Web3ReactProvider>
  )
}

export default Web3ContextProvider