import {
  mergeItemAttributes,
  getSaleItemsForEmail,
  getSaleItems,
  calculateItemsDiscount,
  convertItemTimeStampToDate,
  getSaleItemsWithDiscountAboveOrEqualTo,
  sortSaleItemsByDiscountDescending,
} from '../src/data/sams_data';
import type {ItemAttributes, SaleItem} from '../src/models/sams_data_models';

describe('mergeItemAttributes', () => {
  test('should merge item attributes correctly', () => {
    const data = [
      {id: 1, name: 'Item 1'},
      {id2: 2, name2: 'Item 2'},
      {id3: 3, name3: 'Item 3'},
      {id4: 4, name4: 'Item 4'},
    ];

    const expectedMergedItemAttributes = [
      {id: 1, name: 'Item 1', id2: 2, name2: 'Item 2'},
      {id3: 3, name3: 'Item 3', id4: 4, name4: 'Item 4'},
    ];

    const mergedItemAttributes = mergeItemAttributes(data);

    expect(mergedItemAttributes).toEqual(expectedMergedItemAttributes);
  });

  test('should handle odd number of items correctly', () => {
    const data = [
      {id: 1, name: 'Item 1'},
      {id2: 2, name2: 'Item 2'},
      {id3: 3, name3: 'Item 3'},
    ];

    const expectedMergedItemAttributes = [
      {id: 1, name: 'Item 1', id2: 2, name2: 'Item 2'},
      {id3: 3, name3: 'Item 3'},
    ];

    const mergedItemAttributes = mergeItemAttributes(data);

    expect(mergedItemAttributes).toEqual(expectedMergedItemAttributes);
  });

  test('should throw an error if data is empty', () => {
    const data: ItemAttributes[] = [];

    expect(() => mergeItemAttributes(data)).toThrow('Empty Array provided');
  });
});

describe('getSalesItemsForEmail', () => {
  test('should return the correct sales items for email', () => {
    const data = [
      {
        skuDisplayName: ['Item 1'],
        'product.displayName': ['Item 1'],
        'sku.lastPrice': ['100'],
        'sku.finalPrice': ['90'],
        'product.promotions': ['Promotion 1', 'Promotion 2'],
        eventRemainingTime: ['193908'],
        eventExpiresAt: ['163908'],
      },
      {
        skuDisplayName: ['Item 2'],
        'product.displayName': ['Item 2'],
        'sku.lastPrice': ['1002'],
        'sku.finalPrice': ['902'],
        'product.promotions': ['Promotion 12', 'Promotion 2'],
        eventRemainingTime: ['1939082'],
        eventExpiresAt: ['1639082'],
      },
    ];

    const expectedSalesItemsForEmail = [
      {
        name: ['Item 1'],
        displayName: ['Item 1'],
        lastPrice: ['100'],
        finalPrice: ['90'],
        productPromotions: ['Promotion 1', 'Promotion 2'],
        saleRemainingTime: 193908,
        saleExpiresAt: 163908,
      },
    ];

    const salesItemsForEmail = getSaleItemsForEmail(data);
    expect(salesItemsForEmail[0].name).toEqual(
      expectedSalesItemsForEmail[0].name
    );
  });

  test('should throw an error if no sales items are available', () => {
    const data = [
      {id: 1, name: 'Item 1', No_Disponible_and_Remind_Me: true},
      {id: 2, name: 'Item 2', No_Disponible_and_Remind_Me: true},
      {id: 3, name: 'Item 3', No_Disponible_and_Remind_Me: true},
    ];

    expect(() => getSaleItemsForEmail(data)).toThrow('Empty Array provided');
  });
});

describe('getSaleItems', () => {
  test('should throw an error if data is empty', () => {
    const data: ItemAttributes[] = [];

    expect(() => getSaleItems(data)).toThrow('Empty Array provided');
  });

  test('should return the correct sale items', () => {
    const data = [
      {
        skuDisplayName: ['Item 1'],
        'product.displayName': ['Item 1'],
        'sku.lastPrice': ['100'],
        'sku.finalPrice': ['90'],
        'product.promotions': ['Promotion 1', 'Promotion 2'],
        eventRemainingTime: ['193908'],
        eventExpiresAt: ['163908'],
      },
      {
        skuDisplayName: ['Item 2'],
        'product.displayName': ['Item 2'],
        'sku.lastPrice': ['1002'],
        'sku.finalPrice': ['902'],
        'product.promotions': ['Promotion 12', 'Promotion 2'],
        eventRemainingTime: ['1939082'],
        eventExpiresAt: ['1639082'],
      },
    ];

    const expectedSaleItems = [
      {
        name: ['Item 1'],
        displayName: ['Item 1'],
        lastPrice: ['100'],
        finalPrice: ['90'],
        productPromotions: ['Promotion 1', 'Promotion 2'],
        saleRemainingTime: ['193908'],
        saleExpiresAt: ['163908'],
      },
      {
        name: ['Item 2'],
        displayName: ['Item 2'],
        lastPrice: ['1002'],
        finalPrice: ['902'],
        productPromotions: ['Promotion 12', 'Promotion 2'],
        saleRemainingTime: ['1939082'],
        saleExpiresAt: ['1639082'],
      },
    ];

    const saleItems = getSaleItems(data);

    expect(saleItems).toEqual(expectedSaleItems);
  });
});

describe('calculateItemsDiscount', () => {
  test('should calculate discount and price difference for each item', () => {
    const data: SaleItem[] = [
      {
        name: ['Item 1'],
        displayName: ['Item 1'],
        lastPrice: ['100'],
        finalPrice: ['90'],
        productPromotions: ['Promotion 1', 'Promotion 2'],
        saleRemainingTime: ['193908'],
        saleExpiresAt: ['163908'],
      },
      {
        name: ['Item 2'],
        displayName: ['Item 2'],
        lastPrice: ['1002'],
        finalPrice: ['902'],
        productPromotions: ['Promotion 12', 'Promotion 2'],
        saleRemainingTime: ['1939082'],
        saleExpiresAt: ['1639082'],
      },
    ];

    const expectedItemsWithDiscount: SaleItem[] = [
      {
        name: ['Item 1'],
        displayName: ['Item 1'],
        lastPrice: ['100'],
        finalPrice: ['90'],
        productPromotions: ['Promotion 1', 'Promotion 2'],
        saleRemainingTime: ['193908'],
        saleExpiresAt: ['163908'],
        discount: '10.00',
        priceDifference: '10.00',
      },
      {
        name: ['Item 2'],
        displayName: ['Item 2'],
        lastPrice: ['1002'],
        finalPrice: ['902'],
        productPromotions: ['Promotion 12', 'Promotion 2'],
        saleRemainingTime: ['1939082'],
        saleExpiresAt: ['1639082'],
        discount: '9.98',
        priceDifference: '100.00',
      },
    ];

    const itemsWithDiscount = calculateItemsDiscount(data);

    expect(itemsWithDiscount).toEqual(expectedItemsWithDiscount);
  });

  test('should throw an error if data is empty', () => {
    const data: SaleItem[] = [];

    expect(() => calculateItemsDiscount(data)).toThrow('Empty Array provided');
  });
});

describe('convertItemTimeStampToDate', () => {
  test('should convert saleExpiresAt timestamp to date', () => {
    const data: SaleItem[] = [
      {
        name: ['Item 2'],
        displayName: ['Item 2'],
        lastPrice: ['1002'],
        finalPrice: ['902'],
        productPromotions: ['Promotion 12', 'Promotion 2'],
        saleRemainingTime: ['1939082'],
        saleExpiresAt: ['1639082'],
      },
    ];

    const expectedItemsWithDate: SaleItem[] = [
      {
        name: ['Item 2'],
        displayName: ['Item 2'],
        lastPrice: ['1002'],
        finalPrice: ['902'],
        productPromotions: ['Promotion 12', 'Promotion 2'],
        saleRemainingTime: ['1939082'],
        saleExpiresAt: ['01/01/1970'], // Replace with the expected date
      },
    ];

    const itemsWithDate = convertItemTimeStampToDate(data);
    expect(itemsWithDate).toEqual(expectedItemsWithDate);
  });

  test('should throw an error if data is empty', () => {
    const data: SaleItem[] = [];

    expect(() => convertItemTimeStampToDate(data)).toThrow(
      'Empty Array provided'
    );
  });
});
describe('getSaleItemsWithDiscountAboveOrEqualTo', () => {
  test('should return sale items with discount above or equal to the specified value', () => {
    const data: SaleItem[] = [
      {
        name: ['Item 1'],
        displayName: ['Item 1'],
        lastPrice: ['100'],
        finalPrice: ['90'],
        productPromotions: ['Promotion 1', 'Promotion 2'],
        saleRemainingTime: ['193908'],
        saleExpiresAt: ['163908'],
        discount: '10.00',
        priceDifference: '10.00',
      },
      {
        name: ['Item 2'],
        displayName: ['Item 2'],
        lastPrice: ['1002'],
        finalPrice: ['902'],
        productPromotions: ['Promotion 12', 'Promotion 2'],
        saleRemainingTime: ['1939082'],
        saleExpiresAt: ['1639082'],
        discount: '9.98',
        priceDifference: '100.00',
      },
    ];

    const discount = 10;
    const expectedSaleItems = [
      {
        name: ['Item 1'],
        displayName: ['Item 1'],
        lastPrice: ['100'],
        finalPrice: ['90'],
        productPromotions: ['Promotion 1', 'Promotion 2'],
        saleRemainingTime: ['193908'],
        saleExpiresAt: ['163908'],
        discount: '10.00',
        priceDifference: '10.00',
      },
    ];

    const saleItems = getSaleItemsWithDiscountAboveOrEqualTo(data, discount);

    expect(saleItems).toEqual(expectedSaleItems);
  });

  test('should return an empty array if no sale items have discount above or equal to the specified value', () => {
    const data: SaleItem[] = [
      {
        name: ['Item 1'],
        displayName: ['Item 1'],
        lastPrice: ['100'],
        finalPrice: ['90'],
        productPromotions: ['Promotion 1', 'Promotion 2'],
        saleRemainingTime: ['193908'],
        saleExpiresAt: ['163908'],
        discount: '10.00',
        priceDifference: '10.00',
      },
      {
        name: ['Item 2'],
        displayName: ['Item 2'],
        lastPrice: ['1002'],
        finalPrice: ['902'],
        productPromotions: ['Promotion 12', 'Promotion 2'],
        saleRemainingTime: ['1939082'],
        saleExpiresAt: ['1639082'],
        discount: '9.98',
        priceDifference: '100.00',
      },
    ];

    const discount = 20;

    expect(getSaleItemsWithDiscountAboveOrEqualTo(data, discount)).toEqual([]);
  });
});
describe('sortSaleItemsByDiscountDescending', () => {
  test('should sort sale items by discount in descending order', () => {
    const data: SaleItem[] = [
      {
        name: ['Item 1'],
        displayName: ['Item 1'],
        lastPrice: ['100'],
        finalPrice: ['90'],
        productPromotions: ['Promotion 1', 'Promotion 2'],
        saleRemainingTime: ['193908'],
        saleExpiresAt: ['163908'],
        discount: '10.00',
        priceDifference: '10.00',
      },
      {
        name: ['Item 2'],
        displayName: ['Item 2'],
        lastPrice: ['1002'],
        finalPrice: ['902'],
        productPromotions: ['Promotion 12', 'Promotion 2'],
        saleRemainingTime: ['1939082'],
        saleExpiresAt: ['1639082'],
        discount: '9.98',
        priceDifference: '100.00',
      },
      {
        name: ['Item 3'],
        displayName: ['Item 3'],
        lastPrice: ['500'],
        finalPrice: ['400'],
        productPromotions: ['Promotion 3', 'Promotion 4'],
        saleRemainingTime: ['1939083'],
        saleExpiresAt: ['1639083'],
        discount: '20.00',
        priceDifference: '100.00',
      },
    ];

    const expectedSortedItems: SaleItem[] = [
      {
        name: ['Item 3'],
        displayName: ['Item 3'],
        lastPrice: ['500'],
        finalPrice: ['400'],
        productPromotions: ['Promotion 3', 'Promotion 4'],
        saleRemainingTime: ['1939083'],
        saleExpiresAt: ['1639083'],
        discount: '20.00',
        priceDifference: '100.00',
      },
      {
        name: ['Item 1'],
        displayName: ['Item 1'],
        lastPrice: ['100'],
        finalPrice: ['90'],
        productPromotions: ['Promotion 1', 'Promotion 2'],
        saleRemainingTime: ['193908'],
        saleExpiresAt: ['163908'],
        discount: '10.00',
        priceDifference: '10.00',
      },
      {
        name: ['Item 2'],
        displayName: ['Item 2'],
        lastPrice: ['1002'],
        finalPrice: ['902'],
        productPromotions: ['Promotion 12', 'Promotion 2'],
        saleRemainingTime: ['1939082'],
        saleExpiresAt: ['1639082'],
        discount: '9.98',
        priceDifference: '100.00',
      },
    ];

    const sortedItems = sortSaleItemsByDiscountDescending(data);

    expect(sortedItems).toEqual(expectedSortedItems);
  });

  test('should throw an error if data is empty', () => {
    const data: SaleItem[] = [];

    expect(() => sortSaleItemsByDiscountDescending(data)).toThrow(
      'Empty Array provided'
    );
  });
});