import type {SaleItem, SaleItemRaw} from '../models/sams_data_models';
import {mergeObjects} from '../utils/data_utils';

export default class SamsDataManager {
  /**
   * Cleans the sales data by removing unnecessary properties and ensuring that the
   * most important properties are present.
   *
   * @param data - the raw sales data to be cleaned
   * @returns the cleaned sales data
   */
  public cleanSalesData(data: SaleItemRaw[]): SaleItem[] {
    if (data.length === 0) return [];
    return data.map(item => {
      return {
        name: item.name.length > 0 ? item.name[0] : '',
        displayName: item.displayName.length > 0 ? item.displayName[0] : '',
        lastPrice: item.lastPrice.length > 0 ? item.lastPrice[0] : '',
        finalPrice: item.finalPrice.length > 0 ? item.finalPrice[0] : '',
        productPromotions:
          item.productPromotions.length > 0 ? item.productPromotions[0] : '',
        saleRemainingTime:
          item.saleRemainingTime.length > 0 ? item.saleRemainingTime[0] : '',
        saleExpiresAt:
          item.saleExpiresAt.length > 0 ? item.saleExpiresAt[0] : '',
        status: item.status.length > 0 ? item.status[0] : '',
      };
    });
  }

  public formatSalesData(data: SaleItem[]): SaleItem[] {
    if (data.length === 0) return [];
    const result: SaleItem[] = [];
    for (let index = 0; index < data.length; index += 2) {
      result.push(mergeObjects(data[index], data[index + 1]));
    }
    return result;
  }
}
