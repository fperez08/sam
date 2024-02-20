import type {AxiosRequestConfig} from 'axios';
import HttpClient from '../../http/http_client';

export default class SamsService extends HttpClient {
  constructor(config: AxiosRequestConfig) {
    super(config);
  }
  public getSales() {
    return this.get('sams/department/rebajas/_/N-akm');
  }
}
