import type { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { Web3ReactHooks, Web3ReactProvider, useWeb3React } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import type { WalletConnect } from '@web3-react/walletconnect-v2'
import { formatEther } from '@ethersproject/units'
import useCoinbaseWalletConnect from "lib/web3/hooks/useCoinbaseWalletConnect"
import useMetamaskWalletConnect from "lib/web3/hooks/useMetamaskWalletConnect"
import useWalletConnectWalletConnect from "lib/web3/hooks/useWalletConnectWalletConnect"
import { useCallback, useEffect, useState } from "react"
import { Web3Provider } from '@ethersproject/providers'
import { Contract } from "@ethersproject/contracts"

import { coinbaseWallet, hooks as coinbaseWalletHooks } from 'lib/web3/connectors/coinbaseWallet'
import { hooks as metaMaskHooks, metaMask } from 'lib/web3/connectors/metaMask'
import { hooks as walletConnectHooks, walletConnect } from 'lib/web3/connectors/walletConnect'
import React, { ReactNode } from 'react'
import useAuthenticationStore from 'stores/useAuthenticationStore'
import usePlugWalletConnect from 'lib/web3/hooks/usePlugWalletConnect'
import { Balance } from 'types'
import RBOriReblockICActor from 'lib/web3/actors/RBOriReblockICActor'
import NSSLedgerReblockICActor from 'lib/web3/actors/NSSLedgerReblockICActor'
import rbOriIdlFactory from 'lib/web3/idls/rbori.did'
import nnsLedgerIdlFactory from 'lib/web3/idls/nns_ledger.did'

import rbVault from 'lib/web3/abis/rb_vault.json'
import rbUSDC from 'lib/web3/abis/dummy_rb_usdc.json'

const connectors: [MetaMask | WalletConnect | WalletConnect | CoinbaseWallet, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [coinbaseWallet, coinbaseWalletHooks],
]

type Context = {
  isPlugWalletConnected: boolean
  accounts?: string[]
  balances?: Balance[]
  disconnect: () => Promise<void>
  isActive: boolean
  isLoading: boolean
  error: any | null
  connectMetaMask: () => Promise<void>
  connectCoinbase: () => Promise<void>
  connectWalletConnect: () => Promise<void>
  connectPlug: () => Promise<void>
  provider?: Web3Provider
  rbOriReblockICActor?: RBOriReblockICActor
  nnsLedgerActorReblockICActor?: NSSLedgerReblockICActor
}

export const Web3Context = React.createContext<Context>({
  isPlugWalletConnected: false,
  accounts: [],
  balances: [],
  disconnect: async () => { },
  isActive: false,
  isLoading: false,
  error: null,
  connectMetaMask: async () => { },
  connectCoinbase: async () => { },
  connectWalletConnect: async () => { },
  connectPlug: async () => { },
  provider: undefined
})

const rbOriReblockICActor = new RBOriReblockICActor(
  process.env.REACT_APP_RB_ORI_CANISTER_ID as string,
  rbOriIdlFactory
)

const nnsLedgerActorReblockICActor = new NSSLedgerReblockICActor(
  process.env.REACT_APP_NNS_LEDGER_CANISTER_ID as string,
  nnsLedgerIdlFactory
)

const Web3ContextProviderWrapper: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const authenticationStore = useAuthenticationStore()
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

  const {
    connect: connectPlug,
    error: plugError,
    isActivating: plugIsActivating,
    account: plugAccount,
    balances: plugBalances,
    disconnect: plugDisconnect,
  } = usePlugWalletConnect()

  const {
    connector,
    isActivating,
    isActive,
    accounts,
    provider,
  } = useWeb3React()

  const [balances, setBalances] = useState<Balance[] | undefined>(undefined)

  useEffect(() => {
    setBalances(plugBalances)
  }, [plugBalances])

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false

      // const contractAddress = "0x0D2d1f55ebb9809466fef811546f1F0252346931";
      // const contract = new Contract(contractAddress, rbVault.abi, provider.getSigner())

      // const usdcContractAddress = "0xa155009347F13cD78CF6B4C7d9C3cf11C821149b";
      // const usdcContract = new Contract(usdcContractAddress, rbUSDC.abi, provider.getSigner())

      // Lender -> put money into pool -> get RBT
      // usdcContract.approve(contractAddress, BigInt(20 * 1_000_000_000_000_000_000)).then((_: string) => {
      //   contract.deposit(BigInt(1 * 1_000_000_000_000_000_000), accounts[0]).then((depositResult: string) => {
      //     console.log(depositResult)
      //   })
      // })


      // Borrower -> get money from pool
      // contract.totalAssets().then((result: number) => {
      //   console.log(formatEther(result))
      //   contract.drawdown(accounts[0], result).then((drawdownResult: string) => {
      //     console.log(drawdownResult);
      //   })
      // })

      // Borrower -> insert money into pool
      // usdcContract.transfer(contractAddress, BigInt(1 * 1_100_000_000_000_000_000)).then((transferResult: string) => {
      //   console.log(transferResult)
      // })

      // Lender -> redeed RBT -> get USDC
      // contract.redeem(BigInt(1 * 1_000_000_000_000_000_000), accounts[0], accounts[0]).then((redeemResult: string) => {
      //   console.log(redeemResult)
      // })


      void Promise.all(accounts.map((account: string) => provider.getBalance(account)))
        .then((balances) => {
          if (stale) return

          const mappedBalances: Balance[] = balances.map((balance) => ({
            currency: 'ETH',
            amount: formatEther(balance),
          }))

          setBalances(mappedBalances)
        })

      return () => {
        stale = true
        setBalances(undefined)
      }
    }
  }, [provider, accounts])

  const disconnect = useCallback(async () => {
    if (connector.deactivate) {
      await connector.deactivate()
    } else {
      await connector.resetState()
    }

    plugDisconnect()

    authenticationStore.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector, authenticationStore.reset, plugDisconnect])

  return (
    <Web3Context.Provider value={{
      isPlugWalletConnected: !!plugAccount,
      accounts: plugAccount ? [plugAccount] : accounts,
      balances,
      isActive: isActive || !!plugAccount,
      isLoading: isActivating || plugIsActivating,
      error: metamaskError || coinbaseError || walletConnectError || plugError,
      disconnect,
      connectCoinbase,
      connectMetaMask,
      connectWalletConnect,
      connectPlug,
      provider,
      rbOriReblockICActor,
      nnsLedgerActorReblockICActor,
    }}>
      {children}
    </Web3Context.Provider>
  )
}

const Web3ContextProvider: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Web3ContextProviderWrapper>
        {children}
      </Web3ContextProviderWrapper>
    </Web3ReactProvider>
  )
}

export default Web3ContextProvider