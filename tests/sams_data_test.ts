import SamsDataManager from '../src/data/sams_data';
import {type SaleItemRaw, type SaleItem} from '../src/models/sams_data_models';
import {describe, test, expect, beforeEach} from 'bun:test';
describe('SamsDataManager', () => {
  let samsDataManager: SamsDataManager;

  beforeEach(() => {
    samsDataManager = new SamsDataManager();
  });

  describe('cleanSalesData', () => {
    test('should return an empty array when given an empty array', () => {
      const data: SaleItemRaw[] = [];
      const result = samsDataManager.cleanSalesData(data);
      expect(result).toEqual([]);
    });

    test('should return an array of SaleItem objects when given an array of SaleItemRaw objects', () => {
      const data: SaleItemRaw[] = [
        {
          name: ['Item Name'],
          displayName: ['Display Name'],
          lastPrice: ['$10.00'],
          finalPrice: ['$10.00'],
          productPromotions: ['Product Promotions'],
          saleRemainingTime: ['Sale Remaining Time'],
          saleExpiresAt: ['Sale Expires At'],
          status: ['Status'],
        },
      ];
      const expectedResult: SaleItem[] = [
        {
          name: 'Item Name',
          displayName: 'Display Name',
          lastPrice: '$10.00',
          finalPrice: '$10.00',
          productPromotions: 'Product Promotions',
          saleRemainingTime: 'Sale Remaining Time',
          saleExpiresAt: 'Sale Expires At',
          status: 'Status',
        },
      ];
      const result = samsDataManager.cleanSalesData(data);
      expect(result).toEqual(expectedResult);
    });
  });
});
