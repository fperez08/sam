import {test, expect, spyOn} from 'bun:test';
import {DBService} from '../src/database/databse_service';
import {Database} from 'bun:sqlite';

test('storeSalesData inserts or replaces a record in the sales table', () => {
  // Mock process.env.DB_PATH
  const mockDbPath = 'mock_db_path';
  const originalEnv = process.env;
  process.env = {...originalEnv, DB_PATH: mockDbPath};

  // Mock the run method of the database
  const mockRun = spyOn(Database.prototype, 'run');

  // Sample data
  const id = 1;
  const data = [
    {
      name: 'product1',
      displayName: 'Product 1',
      lastPrice: '100',
      finalPrice: '80',
      productPromotions: '20% off',
      saleRemainingTime: '2 days',
      saleExpiresAt: '2024-03-07T00:00:00',
      status: 'active',
    },
    {
      name: 'product2',
      displayName: 'Product 2',
      lastPrice: '50',
      finalPrice: '40',
      productPromotions: '20% off',
      saleRemainingTime: '1 day',
      saleExpiresAt: '2024-03-06T12:00:00',
      status: 'active',
    },
  ];

  // Call the method
  DBService.storeSalesData(id, data);

  // Check if the run method of the database was called with the correct parameters
  expect(mockRun).toHaveBeenCalledWith(
    'INSERT OR REPLACE INTO sales (id, data) VALUES (?, ?)',
    [id, JSON.stringify(data)]
  );

  // Restore process.env
  process.env = originalEnv;
});
