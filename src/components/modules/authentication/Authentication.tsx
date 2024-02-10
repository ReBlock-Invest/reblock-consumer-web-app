import { App } from "antd"
import useRepositories from "hooks/useRepositories"
import useWeb3 from "hooks/useWeb3"
import React, { useCallback, useEffect, useRef } from "react"
import useAuthenticationStore from "stores/useAuthenticationStore"

type Props = {

}

const AUTHENTICATION_LOADING_KEY = 'authentication-loading'

const Authentication: React.FC<Props> = () => {
  const { message } = App.useApp()
  const authenticationStore = useAuthenticationStore()
  const web3 = useWeb3()
  const repositories = useRepositories()
  const isAuthenticatingRef = useRef(false)

  useEffect(() => {
    if (authenticationStore.isLoading) {
      message.open({
        key: AUTHENTICATION_LOADING_KEY,
        content: 'Authenticating...',
        type: 'loading',
      })
    } else {
      message.destroy(AUTHENTICATION_LOADING_KEY)
    }
  }, [authenticationStore.isLoading, message])

  const authenticate = useCallback(async (walletId: string) => {
    try {
      isAuthenticatingRef.current = true
      authenticationStore.setIsLoading(true)

      const nonce = await repositories.authenticationRepository?.getNonce(walletId)

      if (web3.isPlugWalletConnected) {
        const accessToken = await repositories.authenticationRepository?.getAccessToken(
          walletId,
          'hardcoded-plug-wallet-signature'
        )

        authenticationStore.setToken(accessToken)
      } else {
        const signer = web3.provider?.getSigner(walletId)
        const signature = await signer?.signMessage(`${nonce}`)

        const accessToken = await repositories.authenticationRepository?.getAccessToken(
          walletId,
          signature as string
        )

        authenticationStore.setToken(accessToken)
      }

      message.success('Welcome!')
    } catch (error) {      
      message.error('Authentication error!')
      web3.disconnect()
    } finally {
      authenticationStore.setIsLoading(false)
      isAuthenticatingRef.current = false
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    authenticationStore.setIsLoading,
    authenticationStore.setToken,
    message,
    repositories.authenticationRepository,
    web3.provider,
    web3.isPlugWalletConnected,
  ])

  useEffect(() => {
    if (web3.accounts && web3.accounts.length && !authenticationStore.token && !isAuthenticatingRef.current) {
      const account = web3.accounts[0]
      authenticate(account)
    }
  }, [authenticate, authenticationStore.token, web3.accounts])

  return null
}

export default Authentication