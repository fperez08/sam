import type {SaleItem, ItemAttributes} from '../models/sams_data_models';
import {
  getPropertyValue,
  convertTimeStampToDate,
  pipe,
  checkIfArrayIsEmpty,
} from '../utils/helper';

/**
 *  Merges the attributes of each item in the given data array.
 * @param data  - An array of ItemAttributes objects.
 * @returns - An array of ItemAttributes objects.
 */
export function mergeItemAttributes(data: ItemAttributes[]) {
  checkIfArrayIsEmpty(data);
  const mergedItemAttributes = [];
  for (let index = 0; index < data.length; index += 2) {
    mergedItemAttributes.push({
      ...data[index],
      ...data[index + 1],
    });
  }
  return mergedItemAttributes;
}

/**
 * Returns an array of SaleItem objects that are in stock and suitable for sending in an email.
 * @param data - An array of ItemAttributes objects.
 * @returns {SaleItem[]} An array of SaleItem objects.
 */
export function getSaleItemsForEmail(data: ItemAttributes[]): SaleItem[] {
  checkIfArrayIsEmpty(data);
  const salesItemsInStock = data.filter(
    item =>
      !Object.prototype.hasOwnProperty.call(item, 'No_Disponible_and_Remind_Me')
  );
  const saleItems = getSaleItems(salesItemsInStock);
  return pipe(calculateItemsDiscount, convertItemTimeStampToDate)(saleItems);
}

/**
 * Extract the data for a SaleItem
 *
 * @param data - SaleItem Attributes array
 * @returns SaleItem array.
 */
export function getSaleItems(data: ItemAttributes[]): SaleItem[] {
  checkIfArrayIsEmpty(data);
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
export function calculateItemsDiscount(data: SaleItem[]): SaleItem[] {
  checkIfArrayIsEmpty(data);
  const itemsWithDiscount: SaleItem[] = [];

  data.forEach(item => {
    const lastPrice = parseFloat(item.lastPrice[0]);
    const finalPrice = parseFloat(item.finalPrice[0]);

    const discount = (((lastPrice - finalPrice) / lastPrice) * 100).toFixed(2);
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
export function convertItemTimeStampToDate(data: SaleItem[]): SaleItem[] {
  checkIfArrayIsEmpty(data);
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
export function getSaleItemsWithDiscountAboveOrEqualTo(
  data: SaleItem[],
  discount: number
): SaleItem[] {
  return data.filter(item => {
    if (item.discount) {
      return parseInt(item.discount) >= discount;
    }
  });
}

/**
 * Sorts an array of SaleItems by discount in descending order.
 *
 * @param data - The array of SaleItems to be sorted.
 * @returns A new array of SaleItems sorted by discount in descending order.
 */
export function sortSaleItemsByDiscountDescending(
  data: SaleItem[]
): SaleItem[] {
  checkIfArrayIsEmpty(data);
  const sortedItems = [...data];
  sortedItems.sort((a, b) => {
    const discountA = parseFloat(a.discount as string);
    const discountB = parseFloat(b.discount as string);
    return discountB - discountA;
  });
  return sortedItems;
}
