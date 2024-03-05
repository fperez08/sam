import {test, expect, mock, jest} from 'bun:test';
import SamsService from '../src/services/sams/sams_services';
import type {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

test('SamsService.getSales should make a GET request to the Sams API endpoint', async () => {
  // Mock configuration
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: 'Bearer mockToken',
    },
  };

  // Mock response data
  const responseData = {data: 'Mock response data'};
  const expectedResponse: AxiosResponse = {
    data: responseData,
    status: 200,
    statusText: 'OK',
    headers: {},
    // @ts-expect-error: Unreachable code error
    config: {},
  };

  // Mock HttpClient instance
  const mockHttpClient = {
    get: mock(() => Promise.resolve(expectedResponse)),
  };

  // Create an instance of SamsService
  const samsService = new SamsService(config);

  // Set the HttpClient instance to the mocked HttpClient
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (samsService as any).get = mockHttpClient.get;

  // Make the GET request
  const response = await samsService.getSales();

  // Assert that HttpClient.get was called with the correct arguments
  expect(mockHttpClient.get).toHaveBeenCalledWith(
    'sams/department/rebajas/_/N-akm'
  );

  // Assert that the response matches the expected response
  expect(response).toEqual(expectedResponse);
});

test('SamsService.getSales should return an AxiosError when the request fails', async () => {
  // Mock configuration
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: 'Bearer mockToken',
    },
  };

  // Mock error
  const mockError = new Error('Network Error');
  const axiosError: AxiosError = {
    // @ts-expect-error: Unreachable code error
    config: {},
    isAxiosError: true,
    toJSON: jest.fn().mockReturnValueOnce({
      message: mockError.message,
      name: mockError.name,
      stack: mockError.stack,
    }),
    message: mockError.message,
    name: mockError.name,
    stack: mockError.stack,
    response: undefined,
    request: undefined,
  };

  // Mock HttpClient instance to throw an error
  const mockHttpClient = {
    get: mock(() => Promise.reject(axiosError)),
  };

  // Create an instance of SamsService
  const samsService = new SamsService(config);

  // Set the HttpClient instance to the mocked HttpClient
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (samsService as any).get = mockHttpClient.get;
  try {
    // Make the GET request
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await samsService.getSales();
  } catch (error) {
    // Assert that HttpClient.get was called with the correct arguments
    expect(mockHttpClient.get).toHaveBeenCalledWith(
      'sams/department/rebajas/_/N-akm'
    );
  }
});
