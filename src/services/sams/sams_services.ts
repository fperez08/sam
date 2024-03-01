import type {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import HttpClient from '../../http/http_client';

export default class SamsService extends HttpClient {
  constructor(config: AxiosRequestConfig) {
    super(config);
  }

  /**
   * Makes a GET request to the Sams API endpoint for sales data.
   *
   * @returns A Promise that resolves to the API response, or rejects with an error.
   */
  public async getSales(): Promise<AxiosResponse | AxiosError> {
    return await this.get('sams/department/rebajas/_/N-akm');
  }
}
