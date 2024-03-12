import type {SaleItem, SaleItemAttributes} from '../models/sams_data_models';
import {getPropertyValue, convertTimeStampToDate, pipe} from '../utils/helper';
export default class SamsDataManager {
  private data: SaleItemAttributes[];
  constructor(data: SaleItemAttributes[]) {
    this.checkIsEmpty(data);
    this.data = this.mergeSalesItemsAttributes(data);
  }
  private checkIsEmpty(data: SaleItemAttributes[]) {
    if (data.length === 0) throw Error('Empty data passed to SamsDataManager');
  }

  private mergeSalesItemsAttributes(data: SaleItemAttributes[]) {
    const mergedSalesItemAttributes = [];
    for (let index = 0; index < data.length; index += 2) {
      mergedSalesItemAttributes.push({
        ...data[index],
        ...data[index + 1],
      });
    }
    return mergedSalesItemAttributes;
  }

  public getSalesItemsForEmail(): SaleItem[] {
    const salesItemsInStock = this.data.filter(
      item =>
        !Object.prototype.hasOwnProperty.call(
          item,
          'No_Disponible_and_Remind_Me'
        )
    );
    const saleItems = this.getDataForEmail(salesItemsInStock);
    return pipe(
      this.calculateItemsDiscount,
      this.convertItemTimeStampToDate
    )(saleItems);
  }

  private getDataForEmail(data: SaleItemAttributes[]): SaleItem[] {
    if (data.length === 0) return [];
    return data.map(item => {
      return {
        name: getPropertyValue(item, 'skuDisplayName'),
        displayName: getPropertyValue(item, 'product.displayName'),
        lastPrice: getPropertyValue(item, 'sku.lastPrice'),
        finalPrice: getPropertyValue(item, 'sku.finalPrice'),
        productPromotions: getPropertyValue(item, 'product.promotions'),
        saleRemainingTime: getPropertyValue(item, 'eventRemainingTime'),
        saleExpiresAt: getPropertyValue(item, 'eventExpiresAt'),
      };
    }) as SaleItem[];
  }

  /**
   * Calculates the discount for each item in the given sales data.
   *
   * @param {SaleItem[]} data - Array of SalesItem objects.
   * @returns {SaleItem[]} - The sales data with the calculated discounts
   */
  private calculateItemsDiscount(data: SaleItem[]): SaleItem[] {
    const itemsWithDiscount: SaleItem[] = [];

    data.forEach(item => {
      const lastPrice = parseFloat(item.lastPrice[0]);
      const finalPrice = parseFloat(item.finalPrice[0]);

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
  private convertItemTimeStampToDate(data: SaleItem[]): SaleItem[] {
    const itemsWithDate: SaleItem[] = [];
    data.forEach(item => {
      if (item.saleExpiresAt) {
        const timeStamp = parseInt(item.saleExpiresAt[0]);
        item.saleExpiresAt[0] = convertTimeStampToDate(timeStamp);
        itemsWithDate.push(item);
      }
    });
    return itemsWithDate;
  }
}
