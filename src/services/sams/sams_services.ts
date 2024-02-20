import type {AxiosRequestConfig} from 'axios';
import HttpClient from '../../http/http_client';

export default class SamsService extends HttpClient {
  constructor(config: AxiosRequestConfig) {
    super(config);
  }
  public async getSales() {
    return await this.get('sams/department/rebajas/_/N-akm');
  }
}
