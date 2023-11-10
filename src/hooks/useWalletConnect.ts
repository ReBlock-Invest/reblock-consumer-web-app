import { useWeb3React } from "@web3-react/core"
import useCoinbaseWalletConnect from "lib/web3/hooks/useCoinbaseWalletConnect"
import useMetamaskWalletConnect from "lib/web3/hooks/useMetamaskWalletConnect"
import useWalletConnectWalletConnect from "lib/web3/hooks/useWalletConnectWalletConnect"
import { useCallback } from "react"

const useWalletConnect = () => {
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

  const { connector, isActivating, isActive, account } = useWeb3React()

  const disconnect = useCallback(async () => {
    if (connector.deactivate) {
      void connector.deactivate()
    } else {
      void connector.resetState()
    }
  }, [connector])

  return {
    account,
    disconnect,
    isActive,
    isLoading: isActivating,
    error: metamaskError || coinbaseError || walletConnectError,

    connectMetaMask,
    connectCoinbase,
    connectWalletConnect,
  }
}

export default useWalletConnect