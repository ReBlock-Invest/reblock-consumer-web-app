import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface WalletStoreState {
  balance?: number 
  setBalance: (balance?: number) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

const useWalletStore = create<WalletStoreState>()(
  persist(
    (set) => ({
      balance: undefined,
      setBalance: (balance?: number) => set({ balance }),
      isLoading: false,
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
    }),
    {
      name: 'identity-storage', 
      storage: createJSONStorage(() => sessionStorage), 
    }
  )
)

export default useWalletStore 