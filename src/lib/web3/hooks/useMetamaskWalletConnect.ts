import { metaMask } from 'lib/web3/connectors/metaMask'
import { useCallback, useEffect, useState } from 'react'
import IWalletConnectHook from '../interfaces/IWalletConnectHook'

export default function useMetamaskWalletConnect(): IWalletConnectHook {
  const [error, setError] = useState(undefined)

  useEffect(() => {
    // TODO: not sure how this would react with other wallet. Especially if you log in into two wallets (e.g. Plug and Metamask)
    void metaMask.connectEagerly().catch(() => {
       console.debug('Failed to connect eagerly to MetaMask')
    })
  }, [])

  const connect = useCallback(async () => {
    try {
      setError(undefined)
      await metaMask.activate()      
    } catch (err: any) {
      setError(err)
    }
  }, [])

  return {
    connect,
    error,
  }
}