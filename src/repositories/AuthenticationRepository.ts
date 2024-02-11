import { IHttpClient } from "lib/httpclient/types";
import BaseRepository from "./BaseRepository";
import { GetNonceResponse, GetUserInfoResponse, IssueUIDResponse, WalletLoginResponse } from "./types";
import UserInvestStateEnum from "entities/user/UserInvestStateEnum";
import UserTypeIDEnum from "entities/user/UserTypeIDEnum";

class AuthenticationRepository extends BaseRepository {
  private httpClient: IHttpClient
  private host: string
  private isAuthenticated: boolean

  constructor(host: string, httpClient: IHttpClient, isAuthenticated: boolean) {
    super()
    this.httpClient = httpClient
    this.host = host
    this.isAuthenticated = isAuthenticated
  }

  async getNonce(address: string): Promise<number> {
    // TODO: remove this
    if (process.env.REACT_APP_MOCK_KYC_ENABLED) {
      return 12
    }

    const res = await this.httpClient.post<GetNonceResponse>(`${this.host}/nonce`, { address })
    return res.data.nonce
  }

  async getAccessToken(address: string, signature: string): Promise<string> {
    // TODO: remove this
    if (process.env.REACT_APP_MOCK_KYC_ENABLED) {
      return 'dummytoken'
    }

    const res = await this.httpClient.post<WalletLoginResponse>(`${this.host}/wallet/login`, { address, signature })
    return res.data.access_token
  }

  async issueUID(recipient: string): Promise<IssueUIDResponse> {
    const res = await this.httpClient.post<IssueUIDResponse>(`${this.host}/issue`, { recipient })
    return res.data
  }

  async getUserInfo(): Promise<GetUserInfoResponse> {
    // TODO: remove this
    if (process.env.REACT_APP_MOCK_KYC_ENABLED) {
      return {
        address: 'dummyaddress',
        user_type: UserTypeIDEnum.ID_NON_US_INDIVIDUAL,
        invest_state: UserInvestStateEnum.KYC_VERIFIED,
      }
    }  

    const res = await this.httpClient.get<GetUserInfoResponse>(`${this.host}/userinfo`)
    
    return res.data
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated
  }
}

export default AuthenticationRepository