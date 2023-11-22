import { walletConnect, hooks } from 'lib/web3/connectors/walletConnect'
import { useCallback, useEffect, useState } from 'react'
import IWalletConnectHook from '../interfaces/IWalletConnectHook'
import { URI_AVAILABLE } from '@web3-react/walletconnect-v2'

export default function useWalletConnectWalletConnect(): IWalletConnectHook {
  const chainId = hooks.useChainId()
  const [error, setError] = useState(undefined)

  useEffect(() => {
    walletConnect.events.on(URI_AVAILABLE, (uri: string) => {
      // console.log(`debug1 uri: ${uri}`)
    })
  }, [])

  useEffect(() => {
    // void walletConnect.connectEagerly().catch(() => {
    //   console.debug('Failed to connect eagerly to WalletConnect')
    // })
  }, [])

  const connect = useCallback(async () => {
    try {
      setError(undefined)
      await walletConnect.activate(chainId)   
    } catch (err: any) {
      setError(err)
    }
  }, [chainId])

  return {
    connect,
    error,
  }
}