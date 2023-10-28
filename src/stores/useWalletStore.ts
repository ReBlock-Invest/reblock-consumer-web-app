import { WalletAccount } from 'types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface WalletStoreState {
  isLoading: boolean
  walletAccount: WalletAccount | null
  setWalletAccount: (walletAccount: WalletAccount | null) => void
  setIsLoading: (isLoading: boolean) => void
}

export const useWalletStore = create<WalletStoreState>()(
  persist(
    (set, get) => ({
      isLoading: false,
      walletAccount: null,
      setWalletAccount: (walletAccount: WalletAccount | null) => set({ walletAccount }),
      setIsLoading: (isLoading: boolean) => set({isLoading}),
    }),
    {
      name: 'wallet-account',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ walletAccount: state.walletAccount }),
    }
  )
)