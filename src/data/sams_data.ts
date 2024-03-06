import type {SaleItem, SaleItemRaw} from '../models/sams_data_models';
import {mergeObjects, convertTimeStampToDate} from '../utils/data_utils';

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

  /**
   * Merge the data of sales items when is duplicate in two consecutive objects
   * @param {SaleItem[]} data - Array of SalesItem objects.
   * @returns {SaleItem[]} - Array of unique SalesItem objects
   */
  public formatSalesData(data: SaleItem[]): SaleItem[] {
    if (data.length === 0) return [];
    const uniqueSalesData: SaleItem[] = [];
    for (let index = 0; index < data.length; index += 2) {
      uniqueSalesData.push(mergeObjects(data[index], data[index + 1]));
    }
    return uniqueSalesData;
  }

  /**
   * Calculates the discount for each item in the given sales data.
   *
   * @param {SaleItem[]} data - Array of SalesItem objects.
   * @returns {SaleItem[]} - The sales data with the calculated discounts
   */
  public calculateItemsDiscount(data: SaleItem[]): SaleItem[] {
    const itemsWithDiscount: SaleItem[] = [];

    data.forEach(item => {
      const lastPrice = parseFloat(item.lastPrice);
      const finalPrice = parseFloat(item.finalPrice);

      const discount = (((lastPrice - finalPrice) / lastPrice) * 100).toFixed(
        2
      );
      const priceDifference = (lastPrice - finalPrice).toFixed(2);

      const itemWithDiscount: SaleItem = {
        ...item,
        discount: discount,
        priceDifference: priceDifference,
      };

      itemsWithDiscount.push(itemWithDiscount);
    });

    return itemsWithDiscount;
  }

  /**
   *  Converts the unix timestamp of each item to a date string.
   *
   * @param {SaleItem[]} data - The data to convert
   * @returns  {SaleItem[]} - The sales data with the date string
   */
  public convertItemTimeStampToDate(data: SaleItem[]): SaleItem[] {
    const itemsWithDate: SaleItem[] = [];
    data.forEach(item => {
      if (item.saleExpiresAt) {
        const timeStamp = parseInt(item.saleExpiresAt);
        item.saleExpiresAt = convertTimeStampToDate(timeStamp);
        itemsWithDate.push(item);
      }
    });
    return itemsWithDate;
  }
}
