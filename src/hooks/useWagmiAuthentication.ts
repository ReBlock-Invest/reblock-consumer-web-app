import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useBalance, useDisconnect } from 'wagmi'
import { useCallback, useEffect } from "react"
import useIdentityStore from 'stores/useIdentityStore'
import useWalletStore from 'stores/useWalletStore'

const useWagmiAuthentication = (onError: (error: Error) => void) => {
  const identityStore = useIdentityStore()
  const walletStore = useWalletStore()

  const {
    address,
    isConnecting,
  } = useAccount()
  const { open } = useWeb3Modal()
  const {data, isLoading, refetch} = useBalance({address})
  const {disconnect} = useDisconnect()

  useEffect(() => {
    if (address) {
      identityStore.setAddress(address)
    }
    // eslint-disable-next-line
  },[address, identityStore.setAddress])

  useEffect(() => {
    identityStore.setIsLoading(isConnecting)
    // eslint-disable-next-line
  }, [isConnecting, identityStore.setIsLoading])

  useEffect(() => {
    walletStore.setIsLoading(isLoading)
    // eslint-disable-next-line
  }, [isLoading, walletStore.setIsLoading])

  useEffect(() => {
    if (data) {
      walletStore.setBalance(data.decimals)
    }
    // eslint-disable-next-line
  }, [data, walletStore.setBalance])

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
      identityStore.setAddress(undefined)
      walletStore.setBalance(undefined)
    } catch (err: any) {
      onError(err)
    }
    // eslint-disable-next-line
  }, [disconnect, onError, identityStore.setAddress, walletStore.setBalance]);

  return {
    handleLogin,
    handleLogout,
    refetchBalance,
  }
}

export default useWagmiAuthentication