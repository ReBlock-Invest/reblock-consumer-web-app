import { useCallback, useEffect, useState } from 'react'
import IWalletConnectHook from '../interfaces/IWalletConnectHook'
import { Balance } from 'types';
import { Principal } from '@dfinity/principal';

const nnsCanisterId = process.env.REACT_APP_NNS_CANISTER_ID
const whitelist = [
  nnsCanisterId,
];
const host = "https://ic0.app"

const onConnectionUpdate = () => {
  //@ts-ignore
  // console.log(window.ic.plug.sessionManager.sessionData)
}

export default function usePlugWalletConnect(): IWalletConnectHook & {
  isActivating: boolean
  account?: string
  balances?: Balance[]
  disconnect: () => void
  verifyConnection: () => void
} {
  const [error, setError] = useState(undefined)
  const [isActivating, setIsActivating] = useState(false)
  const [account, setAccount] = useState()
  const [balances, setBalances] = useState<Balance[] | undefined>()

  const verifyConnection = async () => {
    //@ts-ignore
    if (!window.ic || !window.ic.plug) return;
    //@ts-ignore
    const connected = await window.ic.plug.isConnected();
    //@ts-ignore
    if (!connected) await window.ic.plug.requestConnect({ whitelist, host });
    //@ts-ignore
    setAccount(window.ic.plug.sessionManager.sessionData.principalId)
  };

  useEffect(() => {
    verifyConnection()
  }, [])

  const connect = useCallback(async () => {
    //@ts-ignore
    if (!window.ic || !window.ic.plug) {
      window.open('https://plugwallet.ooo/', '_blank')
      return 
    }

    try {
      setIsActivating(true)
      setError(undefined)
      //@ts-ignore
      await window.ic.plug.requestConnect({
        whitelist,
        host,
        onConnectionUpdate,
        timeout: 50000
      })

      //@ts-ignore
      const principal: Principal = await window.ic.plug.getPrincipal()
      //@ts-ignore
      setAccount(principal.toText())

      console.log('debugx', principal)

      //@ts-ignore
      const balances: any[] = await window.ic.plug.getBalance()

      const mappedBalances: Balance[] = balances.map((balance) => ({
        currency: balance.symbol,
        amount: balance.amount
      }))

      setBalances(mappedBalances)
    } catch (err: any) {
      setError(err)
    } finally {
      setIsActivating(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    //@ts-ignore
    if (window.ic.plug) {
      //@ts-ignore
      window.ic.plug.disconnect()
    }
  }, [])

  return {
    connect,
    error,
    isActivating,
    account,
    balances,
    disconnect,
    verifyConnection
  }
}