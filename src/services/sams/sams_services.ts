import type {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import HttpClient from '../../http/http_client';
import type {SaleItemAttributes} from '../../models/sams_data_models';
const jp = require('jsonpath');
export default class SamsService extends HttpClient {
  constructor(config: AxiosRequestConfig) {
    super(config);
  }

  /**
   * Makes a GET request to the Sams API endpoint for sales data.
   *
   * @returns A Promise that resolves to the API response, or rejects with an error.
   */
  public async getSales(): Promise<SaleItemAttributes[] | AxiosError> {
    const response = await this.get('sams/department/rebajas/_/N-akm');
    if ((response as AxiosResponse).data) {
      const data = (response as AxiosResponse).data;
      return jp.query(data, '$..attributes');
    } else {
      return response as AxiosError;
    }
  }
}
