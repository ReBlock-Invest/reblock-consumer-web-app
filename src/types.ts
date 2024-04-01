export type WalletAccount = {
  walletId: string
  walletBalance: number
}

export type Balance = {
  currency: string
  amount: string
}

export enum AuthProviderEnum {
  EVM = 'EVM',
  ICP = 'ICP'
}