// @ts-nocheck
import type {AxiosResponse, AxiosError} from 'axios';
import {describe, test, jest, beforeEach, expect} from 'bun:test';
import HttpClient from '../src/http/http_client';

describe('HttpClient', () => {
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = new HttpClient();
  });

  describe('get', () => {
    test('should return the response when the request is successful', async () => {
      // Arrange
      const url = 'https://example.com';
      const expectedResponse: AxiosResponse = {
        data: {message: 'Success'},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      // Mock the axiosInstance.get method to return the expected response
      httpClient.axiosInstance.get = jest
        .fn()
        .mockResolvedValue(expectedResponse);

      // Act
      const response = await httpClient.get(url);

      // Assert
      expect(response).toEqual(expectedResponse);
      expect(httpClient.axiosInstance.get).toHaveBeenCalledWith(
        url,
        httpClient.config
      );
    });

    test('should return the error when the request fails', async () => {
      // Arrange
      const url = 'https://example.com';
      const expectedError: AxiosError = {
        name: 'AxiosError',
        message: 'Request failed',
        isAxiosError: true,
        toJSON: jest.fn(),
        config: {},
        code: '500',
        response: undefined,
      };

      // Mock the axiosInstance.get method to throw the expected error
      httpClient.axiosInstance.get = jest.fn().mockRejectedValue(expectedError);

      // Act
      const error = await httpClient.get(url);

      // Assert
      expect(error).toEqual(expectedError);
      expect(httpClient.axiosInstance.get).toHaveBeenCalledWith(
        url,
        httpClient.config
      );
    });
  });
});
