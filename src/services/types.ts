import UserInfo from "entities/user/UserInfo"

export type GetNonceResponse = {
  nonce: number
  address: string
}

export type WalletLoginResponse = {
  access_token: string
}

export type IssueUIDResponse = {
  trx_id: string
}

export type GetUserInfoResponse = UserInfo