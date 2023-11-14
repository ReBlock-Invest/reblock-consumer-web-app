import { create } from 'zustand'

interface KYCStoreState {
  isShowKYCModal: boolean
  setIsShowKYCModal: (isShowKYCModal: boolean) => void
}

const useKYCStore = create<KYCStoreState>((set) => ({
  isShowKYCModal: false,

  setIsShowKYCModal: (isShowKYCModal: boolean) => set({isShowKYCModal}),
}))

export default useKYCStore 