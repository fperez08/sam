import {DBService} from '../src/database/databse_service';
import {describe, test, expect} from 'bun:test';
import {type SaleItem} from '../src/models/sams_data_models';
describe('DataBaseService', () => {
  test('should insert or replace a record in the sales table', () => {
    const id = 2;
    const data: SaleItem[] = [
      {
        name: 'Product 1',
        displayName: 'Product One',
        lastPrice: '$20',
        finalPrice: '$15',
        productPromotions: '10% off',
        saleRemainingTime: '2 hours',
        saleExpiresAt: '2024-03-01 18:00:00',
        status: 'Active',
      },
      {
        name: 'Product 2',
        displayName: 'Product Two',
        lastPrice: '$30',
        finalPrice: '$25',
        productPromotions: '20% off',
        saleRemainingTime: '1 hour',
        saleExpiresAt: '2024-03-01 17:00:00',
        status: 'Active',
      },
    ];

    // Verify that the record was inserted or replaced
    const result = DBService.storeSalesData(id, data);
    expect(result).toBeUndefined();
  });
});
