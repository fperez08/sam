import type {AxiosRequestConfig} from 'axios';
import HttpClient from '../../http/http_client';
import type {ItemAttributes} from '../../models/sams_data_models';
import axios from 'axios';
import {SamsServiceGetSalesDataError} from '../../errors/errors';
const jsonPath = require('jsonpath');
export default class SamsService extends HttpClient {
  constructor(config: AxiosRequestConfig) {
    super(config);
  }

  /**
   * Makes a GET request to the Sams API endpoint for sales data.
   *
   * @returns A Promise that resolves to the API response, or rejects with an error.
   */
  public async getSales(): Promise<ItemAttributes[]> {
    try {
      const response = await this.get('sams/department/rebajas/_/N-akm');
      if (!axios.isAxiosError(response)) {
        return jsonPath.query(response.data, '$..attributes');
      } else {
        throw new SamsServiceGetSalesDataError(response.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error))
        throw new SamsServiceGetSalesDataError(error.message);
      else throw error;
    }
  }
}
