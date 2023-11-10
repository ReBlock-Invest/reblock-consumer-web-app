import type { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { Web3ReactHooks, Web3ReactProvider, useWeb3React } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import type { WalletConnect } from '@web3-react/walletconnect-v2'
import { formatEther } from '@ethersproject/units'
import useCoinbaseWalletConnect from "lib/web3/hooks/useCoinbaseWalletConnect"
import useMetamaskWalletConnect from "lib/web3/hooks/useMetamaskWalletConnect"
import useWalletConnectWalletConnect from "lib/web3/hooks/useWalletConnectWalletConnect"
import { useCallback, useEffect, useState } from "react"

import { coinbaseWallet, hooks as coinbaseWalletHooks } from 'lib/web3/connectors/coinbaseWallet'
import { hooks as metaMaskHooks, metaMask } from 'lib/web3/connectors/metaMask'
import { hooks as walletConnectHooks, walletConnect } from 'lib/web3/connectors/walletConnect'
import React, { ReactNode } from 'react'

const connectors: [MetaMask | WalletConnect | WalletConnect | CoinbaseWallet, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [coinbaseWallet, coinbaseWalletHooks],
]

type Context = {
  accounts?: string[]
  balances?: string[]
  disconnect: () => Promise<void>
  isActive: boolean
  isLoading: boolean
  error: any | null
  connectMetaMask: () => Promise<void>
  connectCoinbase: () => Promise<void>
  connectWalletConnect: () => Promise<void>
}

export const Web3Context = React.createContext<Context>({
  accounts: [],
  balances: [],
  disconnect: async () => {}, 
  isActive: false,
  isLoading: false,
  error: null,
  connectMetaMask: async () => {},
  connectCoinbase: async () => {},
  connectWalletConnect: async () => {},
})

const Web3ContextProviderWrapper: React.FC<{
  children: ReactNode
}> = ({children}) => {
  const {
    connect: connectMetaMask,
    error: metamaskError,
  } = useMetamaskWalletConnect()

  const {
    connect: connectCoinbase,
    error: coinbaseError,
  } = useCoinbaseWalletConnect()

  const {
    connect: connectWalletConnect,
    error: walletConnectError,
  } = useWalletConnectWalletConnect()

  const { connector, isActivating, isActive, accounts, provider } = useWeb3React()

  const [balances, setBalances] = useState<string[] | undefined>(undefined)
  
  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false

      void Promise.all(accounts.map((account: string) => provider.getBalance(account)))
        .then((balances) => {
        if (stale) return
        setBalances(balances.map((balance) => formatEther(balance)))
      })

      return () => {
        stale = true
        setBalances(undefined)
      }
    }
  }, [provider, accounts])

  const disconnect = useCallback(async () => {
    if (connector.deactivate) {
      void connector.deactivate()
    } else {
      void connector.resetState()
    }
  }, [connector])

  return (
    <Web3Context.Provider value={{
      accounts,
      balances,
      isActive,
      isLoading: isActivating,
      error: metamaskError || coinbaseError || walletConnectError,
      disconnect,
      connectCoinbase,
      connectMetaMask,
      connectWalletConnect
    }}>
      {children}
    </Web3Context.Provider>
  )
}

const Web3ContextProvider: React.FC<{
  children: ReactNode
}> = ({children}) => {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Web3ContextProviderWrapper>
        {children}
      </Web3ContextProviderWrapper>
    </Web3ReactProvider>
  )
}

export default Web3ContextProvider