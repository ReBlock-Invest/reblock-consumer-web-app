import { useWeb3React } from "@web3-react/core"
import useMetamaskWalletConnect from "lib/web3/hooks/useMetamaskWalletConnect"
import { useCallback } from "react"

const useWalletConnect = () => {
  const {
    connect: connectMetaMask,
    error: metamaskError,
  } = useMetamaskWalletConnect()

  const { connector, isActivating, isActive, account } = useWeb3React()

  const disconnect = useCallback(async () => {
    if (connector.deactivate) {
      await connector.deactivate()
    } else {
      await connector.resetState()
    }
  }, [connector])

  return {
    account,
    disconnect,
    isActive,
    isLoading: isActivating,
    error: metamaskError,

    connectMetaMask,
  }
}

export default useWalletConnect