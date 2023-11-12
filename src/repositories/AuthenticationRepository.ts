import { IHttpClient } from "lib/httpclient/types";
import BaseRepository from "./BaseRepository";
import { GetNonceResponse, GetUserInfoResponse, IssueUIDResponse, WalletLoginResponse } from "./types";

class AuthenticationRepository extends BaseRepository {
  private httpClient: IHttpClient
  private host: string

  constructor(host: string, httpClient: IHttpClient) {
    super()
    this.httpClient = httpClient
    this.host = host
  }

  async getNonce(address: string): Promise<number> {
    const res = await this.httpClient.post<GetNonceResponse>(`${this.host}/nonce`, { address })
    return res.data.nonce
  }

  async getAccessToken(address: string, signature: string): Promise<string> {
    const res = await this.httpClient.post<WalletLoginResponse>(`${this.host}/wallet/login`, { address, signature })
    return res.data.access_token
  }

  async issueUID(recipient: string): Promise<IssueUIDResponse> {
    const res = await this.httpClient.post<IssueUIDResponse>(`${this.host}/issue`, { recipient })
    return res.data
  }

  async getUserInfo(): Promise<GetUserInfoResponse> {
    const res = await this.httpClient.get<GetUserInfoResponse>(`${this.host}/userinfo`)
    return res.data
  }

}

export default AuthenticationRepository