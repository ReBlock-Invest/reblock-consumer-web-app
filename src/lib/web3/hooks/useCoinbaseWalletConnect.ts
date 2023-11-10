import { coinbaseWallet } from 'lib/web3/connectors/coinbaseWallet'
import { useCallback, useEffect, useState } from 'react'
import IWalletConnectHook from '../interfaces/IWalletConnectHook'
import { getAddChainParameters } from '../chains'

const DEFAULT_CHAIN_ID = 1; // mainnet

export default function useCoinbaseWalletConnect(): IWalletConnectHook {
  const [error, setError] = useState(undefined)

  useEffect(() => {
    void coinbaseWallet.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to Coinbase')
    })
  }, [])

  const connect = useCallback(async () => {
    try {
      setError(undefined)
      await coinbaseWallet.activate(getAddChainParameters(DEFAULT_CHAIN_ID))
    } catch (err: any) {
      setError(err)
    }
  }, [])

  return {
    connect,
    error,
  }
}