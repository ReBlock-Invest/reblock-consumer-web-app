
import { getAddress, formatEther } from "ethers"
import MetaMaskOnboarding from "@metamask/onboarding"

import { useCallback } from "react"
import { useWalletStore } from "stores/useWalletStore"

const onboarding = new MetaMaskOnboarding({ forwarderOrigin: process.env.APP_PUBLIC_URL })

const useWalletAccount = (onError: (error: Error) => void) => {
  const walletStore = useWalletStore()  

  const handleLogin = useCallback(async () => {
    //@ts-ignore
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        walletStore.setIsLoading(true)
        //@ts-ignore
        const result = await window.ethereum
          .request({ method: "eth_requestAccounts" })
        const walletId = getAddress(result[0])
        //@ts-ignore
        const walletBalance = await window.ethereum
          .request({ method: "eth_getBalance", params: [walletId, "latest"] })
        walletStore.setWalletAccount({
          walletId,
          walletBalance: parseFloat(formatEther(walletBalance)),
        })
      } catch(error: any) {
        onError(error)
      } finally {
        walletStore.setIsLoading(false)
      }
    } else {
      onboarding.startOnboarding();
    }
  }, [walletStore, onError]);
  
  const refetchBalance = useCallback(async () => {
    if (walletStore.walletAccount?.walletId) {
      //@ts-ignore
      const walletBalance = await window.ethereum
        .request({ method: "eth_getBalance", params: [walletStore.walletAccount.walletId, "latest"] })
      walletStore.setWalletAccount({
        ...walletStore.walletAccount,
        walletBalance: parseFloat(formatEther(walletBalance)),
      })
    }
  }, [walletStore])

  const handleLogout = useCallback(() => {
    walletStore.setWalletAccount(null)
  }, [walletStore]);

  return {
    handleLogin,
    handleLogout,
    refetchBalance,
    walletAccountLoading: walletStore.isLoading,
    walletAccount: walletStore.walletAccount,
  }
}

export default useWalletAccount