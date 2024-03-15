import type {SaleProduct, ProductAttributes} from '../models/sams_data_models';
import {
  getPropertyValue,
  convertTimeStampToDate,
  pipe,
  checkIfArrayIsEmpty,
} from '../utils/helper';

/**
 * Merges an array of product attributes into a single array.
 *
 * @param data - The array of product attributes to merge.
 * @returns The merged array of product attributes.
 */
export function mergeProductAttributes(data: ProductAttributes[]) {
  checkIfArrayIsEmpty(data);
  const mergedProductAttributes = [];
  for (let index = 0; index < data.length; index += 2) {
    mergedProductAttributes.push({
      ...data[index],
      ...data[index + 1],
    });
  }
  return mergedProductAttributes;
}

/**
 * Retrieves sale products for email.
 *
 * @param data - The array of product attributes.
 * @returns An array of sale products.
 */
export function getSaleProductsForEmail(
  data: ProductAttributes[]
): SaleProduct[] {
  checkIfArrayIsEmpty(data);
  const saleProductsInStock = data.filter(
    product =>
      !Object.prototype.hasOwnProperty.call(
        product,
        'No_Disponible_and_Remind_Me'
      )
  );
  const saleProducts = getSaleItems(saleProductsInStock);
  console.log('🚀 ~ saleProducts:', saleProducts);
  return pipe(
    calculateProductsDiscount,
    convertItemTimeStampToDate
  )(saleProducts);
}

/**
 * Retrieves the sale products from the given data array.
 * @param data - An array of product attributes.
 * @returns An array of sale products.
 */
export function getSaleItems(data: ProductAttributes[]): SaleProduct[] {
  checkIfArrayIsEmpty(data);
  return data.map(product => {
    return {
      name: getPropertyValue(product, 'skuDisplayName'),
      displayName: getPropertyValue(product, 'product.displayName'),
      lastPrice: getPropertyValue(product, 'sku.lastPrice'),
      finalPrice: getPropertyValue(product, 'sku.finalPrice'),
      productPromotions: getPropertyValue(product, 'product.promotions'),
      saleRemainingTime: getPropertyValue(product, 'eventRemainingTime'),
      saleExpiresAt: getPropertyValue(product, 'eventExpiresAt'),
    };
  }) as SaleProduct[];
}

/**
 * Calculates the discount for each product in the given sales data.
 *
 * @param {SaleProduct[]} data - Array of SalesItem objects.
 * @returns {SaleProduct[]} - The sales data with the calculated discounts
 */
export function calculateProductsDiscount(data: SaleProduct[]): SaleProduct[] {
  checkIfArrayIsEmpty(data);
  const productsWithDiscount: SaleProduct[] = [];

  data.forEach(item => {
    const lastPrice = parseFloat(item.lastPrice[0]);
    const finalPrice = parseFloat(item.finalPrice[0]);

    const discount = (((lastPrice - finalPrice) / lastPrice) * 100).toFixed(2);
    const priceDifference = (lastPrice - finalPrice).toFixed(2);

    const productWithDiscount: SaleProduct = {
      ...item,
      discount: discount,
      priceDifference: priceDifference,
    };

    productsWithDiscount.push(productWithDiscount);
  });

  return productsWithDiscount;
}

/**
 *  Converts the unix timestamp of each item to a date string.
 *
 * @param {SaleProduct[]} data - The data to convert
 * @returns  {SaleProduct[]} - The sales data with the date string
 */
export function convertItemTimeStampToDate(data: SaleProduct[]): SaleProduct[] {
  checkIfArrayIsEmpty(data);
  const productsWithDate: SaleProduct[] = [];
  data.forEach(product => {
    if (product.saleExpiresAt) {
      const timeStamp = parseInt(product.saleExpiresAt[0]);
      product.saleExpiresAt[0] = convertTimeStampToDate(timeStamp);
      productsWithDate.push(product);
    }
  });
  return productsWithDate;
}

/**
 * Filters an array of SaleProducts by discount or promotion.
 *
 * @param data - The array of SaleProducts to be filtered.
 * @returns A new array of SaleProducts filtered by discount or promotion.
 */
export function filterSaleProductsByDiscount(
  data: SaleProduct[]
): SaleProduct[] {
  return data.filter(product => {
    const discount = 20;
    if (product.discount) {
      return isDiscountAboveOrEqualTo(product.discount, discount);
    }
  });
}

/**
 * Sorts an array of SaleProducts by discount in descending order.
 *
 * @param data - The array of SaleProducts to be sorted.
 * @returns A new array of SaleProducts sorted by discount in descending order.
 */
export function sortSaleProductsByPriceDiffDescending(
  data: SaleProduct[]
): SaleProduct[] {
  checkIfArrayIsEmpty(data);
  const sortedItems = [...data];
  sortedItems.sort((a, b) => {
    const discountA = parseFloat(a.priceDifference as string);
    const discountB = parseFloat(b.priceDifference as string);
    return discountB - discountA;
  });
  return sortedItems;
}

export function isDiscountAboveOrEqualTo(
  actualDiscount: string,
  expectDiscount: number
) {
  if (!actualDiscount) return false;
  return parseInt(actualDiscount) >= expectDiscount;
}
