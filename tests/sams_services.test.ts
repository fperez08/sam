// @ts-nocheck
import {describe, test, jest, beforeEach, expect} from 'bun:test';
import SamsServices from '../src/services/sams/sams_services';
import {SamsServiceGetSalesDataError} from '../src/errors/errors';

describe('SamsServices', () => {
  let samsServices: SamsServices;

  beforeEach(() => {
    samsServices = new SamsServices();
  });

  describe('getSales', () => {
    test('should return an array of ItemAttributes when the request is successful', async () => {
      // Arrange
      const expectedResponse = {
        data: {
          attributes: [
            {name: 'Attribute 1', value: 'Value 1'},
            {name: 'Attribute 2', value: 'Value 2'},
          ],
        },
      };

      // Mock the get method to return the expected response
      samsServices.get = jest.fn().mockResolvedValue(expectedResponse);

      // Act
      const result = await samsServices.getProductsOnSale();

      // Assert
      expect(result[0]).toEqual(expectedResponse.data.attributes);
      expect(samsServices.get).toHaveBeenCalledWith(
        'sams/department/rebajas/_/N-akm'
      );
    });

    test('should throw a SamsServiceGetSalesDataError when the request fails', async () => {
      // Arrange
      const expectedError = new SamsServiceGetSalesDataError('Request failed');

      // Mock the get method to throw the expected error
      samsServices.get = jest.fn().mockRejectedValue(expectedError);

      // Act and Assert
      await expect(samsServices.getProductsOnSale()).rejects.toThrow(
        SamsServiceGetSalesDataError
      );
      expect(samsServices.get).toHaveBeenCalledWith(
        'sams/department/rebajas/_/N-akm'
      );
    });
  });
});
