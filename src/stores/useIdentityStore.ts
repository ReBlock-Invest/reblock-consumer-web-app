import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IdentityStoreState {
  address?: string 
  setAddress: (address?: string) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}


const useIdentityStore = create<IdentityStoreState>()(
  persist(
    (set) => ({
      address: undefined,
      setAddress: (address?: string) => set({ address }),
      isLoading: false,
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
    }),
    {
      name: 'identity-storage', 
      storage: createJSONStorage(() => sessionStorage), 
    }
  )
)

export default useIdentityStore 