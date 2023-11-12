import UserInfo from 'entities/user/UserInfo'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthenticationStoreState {
  isLoading: boolean
  userInfo?: UserInfo
  token?: string

  setToken: (token?: string) => void
  setUserInfo: (userInfo?: UserInfo) => void
  setIsLoading: (isLoading: boolean) => void

  reset: () => void
}

const useAuthenticationStore = create<AuthenticationStoreState>()(
  persist(
    (set) => ({
      isLoading: false,
      userInfo: undefined,
      token: undefined,

      setToken: (token?: string) => set({ token }),
      setUserInfo: (userInfo?: UserInfo) => set({ userInfo }),
      setIsLoading:  (isLoading: boolean) => set({ isLoading }),
      reset: () => set({userInfo: undefined, token: undefined}),
    }),
    {
      name: 'authentication-storage', 
      storage: createJSONStorage(() => sessionStorage), 
      partialize: (state) => ({ userInfo: state.userInfo, token: state.token }),
    }
  )
)

export default useAuthenticationStore 