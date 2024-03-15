import type {AxiosRequestConfig} from 'axios';
import HttpClient from '../../http/http_client';
import type {ProductAttributes} from '../../models/sams_data_models';
import axios from 'axios';
import {SamsServiceGetSalesDataError} from '../../errors/errors';
const jsonPath = require('jsonpath');
export default class SamsService extends HttpClient {
  constructor(config: AxiosRequestConfig) {
    super(config);
  }

  /**
   * Retrieves the products on sale from the specified path.
   * @param path - The path to retrieve the products on sale from.
   * @returns A promise that resolves to an array of ProductAttributes representing the products on sale.
   * @throws {SamsServiceGetSalesDataError} If there is an error retrieving the products on sale.
   */
  public async getProductsOnSale(path: string): Promise<ProductAttributes[]> {
    try {
      const response = await this.get(path);
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
