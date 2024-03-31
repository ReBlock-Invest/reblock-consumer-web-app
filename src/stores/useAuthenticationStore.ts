import UserInfo from 'entities/user/UserInfo'
import { AuthProviderEnum } from 'types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthenticationStoreState {
  isShowConnectWalletModal: boolean
  isLoading: boolean
  userInfo?: UserInfo
  token?: string
  selectedAuthProvider: AuthProviderEnum

  setIsShowConnectWalletModal: (isShowConnectWalletModal: boolean) => void
  setToken: (token?: string) => void
  setUserInfo: (userInfo?: UserInfo) => void
  setIsLoading: (isLoading: boolean) => void
  setSelectedAuthProvider: (selectedAuthProvider: AuthProviderEnum) => void,

  reset: () => void
}

const useAuthenticationStore = create<AuthenticationStoreState>()(
  persist(
    (set) => ({
      isShowConnectWalletModal: false,
      isLoading: false,
      userInfo: undefined,
      token: undefined,
      selectedAuthProvider: AuthProviderEnum.ICP,

      setIsShowConnectWalletModal: (isShowConnectWalletModal: boolean) => set({ isShowConnectWalletModal }),
      setToken: (token?: string) => set({ token }),
      setUserInfo: (userInfo?: UserInfo) => set({ userInfo }),
      setIsLoading:  (isLoading: boolean) => set({ isLoading }),
      setSelectedAuthProvider:  (selectedAuthProvider: AuthProviderEnum) => set({ selectedAuthProvider }),
      reset: () => set({
        userInfo: undefined,
        token: undefined,
        isShowConnectWalletModal: false,
      }),
    }),
    {
      name: 'authentication-storage', 
      storage: createJSONStorage(() => sessionStorage), 
      partialize: (state) => ({
        userInfo: state.userInfo,
        token: state.token,
        selectedAuthProvider: state.selectedAuthProvider || AuthProviderEnum.ICP,
      }),
    }
  )
)

export default useAuthenticationStore 