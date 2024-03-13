import {SamsDataManagerIsEmptyError} from '../errors/sams_errors';
import type {SaleItem, SaleItemAttributes} from '../models/sams_data_models';
import {getPropertyValue, convertTimeStampToDate, pipe} from '../utils/helper';
export default class SamsDataManager {
  private data: SaleItemAttributes[];
  constructor(data: SaleItemAttributes[]) {
    this.checkIsEmpty(data);
    this.data = this.mergeSalesItemsAttributes(data);
  }

  /**
   * Checks if the given data is empty. If it is, throws an error.
   *
   * @param data The data to check
   * @throws {SamsDataManagerIsEmptyError} If the data is empty
   */
  private checkIsEmpty(data: SaleItemAttributes[]) {
    if (data.length === 0)
      throw new SamsDataManagerIsEmptyError('No data provided');
  }

  /**
   * Merges two arrays of SaleItemAttributes into one array of SaleItemAttributes,
   * where each element is a merged representation of the two elements in the original arrays.
   *
   * @param data - The array of SaleItemAttributes to merge
   * @returns The merged array of SaleItemAttributes
   */
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

  /**
   * Returns an array of SaleItem objects that are in stock and suitable for sending in an email.
   * @returns {SaleItem[]} An array of SaleItem objects.
   */
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

  /**
   * Extract the data for a SaleItem to be sent by email
   *
   * @param data - SaleItem Attributes array
   * @returns SaleItem array.
   */
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

  /**
   * Returns a new array with all elements that match the given condition.
   * @param data - The array to filter
   * @param condition - The condition to test each element
   * @returns A new array with all elements that match the condition
   */
  public getSaleItemsWithDiscountAboveOrEqualTo(
    data: SaleItem[],
    discount: number
  ): SaleItem[] {
    return data.filter(item => {
      if (item.discount) {
        return parseInt(item.discount) >= discount;
      }
    });
  }
}
