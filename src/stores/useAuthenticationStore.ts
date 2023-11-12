import UserInfo from 'entities/user/UserInfo'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthenticationStoreState {
  userInfo?: UserInfo
  token?: string

  setData: (userInfo?: UserInfo, token?: string) => void
}

const useAuthenticationStore = create<AuthenticationStoreState>()(
  persist(
    (set) => ({
      iserInfo: undefined,
      token: undefined,

      setData: (userInfo?: UserInfo, token?: string) => set({ userInfo, token }),
    }),
    {
      name: 'authentication-storage', 
      storage: createJSONStorage(() => sessionStorage), 
    }
  )
)

export default useAuthenticationStore 