import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface KYCStoreState {
  isKYCCompleted: boolean 
  data: any | null

  setData: (isKYCCompleted: boolean, data: any) => void
}

const useKYCStore = create<KYCStoreState>()(
  persist(
    (set) => ({
      isKYCCompleted: false,
      data: null,

      setData: (isKYCCompleted: boolean, data: any) => set({ isKYCCompleted, data }),
    }),
    {
      name: 'kyc-storage', 
      storage: createJSONStorage(() => sessionStorage), 
    }
  )
)

export default useKYCStore 