import { coinbaseWallet, hooks } from 'lib/web3/connectors/coinbaseWallet'
import { useCallback, useEffect, useState } from 'react'
import IWalletConnectHook from '../interfaces/IWalletConnectHook'
import { getAddChainParameters } from '../chains'

const DEFAULT_CHAIN_ID = 1; // mainnet

export default function useCoinbaseWalletConnect(): IWalletConnectHook {
  const [error, setError] = useState(undefined)

  console.log('debug2', error)

  useEffect(() => {
    void coinbaseWallet.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to Coinbase')
    })
  }, [])

  const connect = useCallback(async () => {
    try {
      setError(undefined)
      await coinbaseWallet.activate(getAddChainParameters(DEFAULT_CHAIN_ID))
      debugger
    } catch (err: any) {
      debugger
      setError(err)
    }
  }, [])

  return {
    connect,
    error,
  }
}