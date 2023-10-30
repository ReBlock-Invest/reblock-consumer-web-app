
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useBalance, useDisconnect } from 'wagmi'
import { useCallback } from "react"


const useWalletAccount = (onError: (error: Error) => void) => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const { open } = useWeb3Modal()
  const {data, refetch} = useBalance({address})
  const {disconnect} = useDisconnect()

  const handleLogin = useCallback(async () => {
    try {
      await open({
        view: "Connect",
      })
    } catch (err: any) {
      onError(err)
    }
  }, [open, onError]);
  
  const refetchBalance = useCallback(async () => {
    try {
      await refetch()
    } catch (err: any) {
      onError(err)
    }
  }, [refetch, onError])

  const handleLogout = useCallback(async () => {
    try {
      await disconnect()
    } catch (err: any) {
      onError(err)
    }
  }, [disconnect, onError]);

  return {
    handleLogin,
    handleLogout,
    refetchBalance,
    walletAccountLoading: isConnecting,
    walletAccount: !isDisconnected ? {
      address,
      balance: data?.formatted,
    } : null,
  }
}

export default useWalletAccount