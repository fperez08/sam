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
   * Fetches the products on sale for a given category.
   * @param categoryId - The category id of the products on sale.
   * @returns - An array of ItemAttributes objects.
   */
  public async getProductsOnSale(
    categoryId: string
  ): Promise<ProductAttributes[]> {
    try {
      this.config.params['categoryId'] = categoryId;
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
