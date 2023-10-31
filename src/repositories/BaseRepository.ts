import IHttpClient from "lib/httpClient/libraries/IHttpClient";

class BaseRepository {
  protected client: IHttpClient
  constructor(httpClient: IHttpClient) {
    this.client = httpClient
  }
}

export default BaseRepository