import {test, expect, mock, jest} from 'bun:test';
import HttpClient from '../src/http/http_client';
import {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';

test('HttpClient.get should make a GET request to the specified URL', async () => {
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

  // Mock axiosInstance.get method
  const mockAxiosInstance = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get: mock((url: string, config: AxiosRequestConfig) =>
      Promise.resolve(expectedResponse)
    ),
  };

  // Create an instance of HttpClient
  const httpClient = new HttpClient(config);

  // Set the axios instance to the mocked axios instance
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (httpClient as any).axiosInstance = mockAxiosInstance;

  // Define the URL
  const url = 'http://example.com';

  // Make the GET request
  // @ts-expect-error: Unreachable code error
  const response = await httpClient.get(url);

  // Assert that axiosInstance.get was called with the correct arguments
  expect(mockAxiosInstance.get).toHaveBeenCalledWith(url, config);

  // Assert that the response matches the expected response
  expect(response).toEqual(expectedResponse);
});

test('HttpClient.get should return an AxiosError when the request fails', async () => {
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

  // Mock axiosInstance.get method to throw an error
  const mockAxiosInstance = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get: mock((url: string, config: AxiosRequestConfig) =>
      Promise.reject(axiosError)
    ),
  };

  // Create an instance of HttpClient
  const httpClient = new HttpClient(config);

  // Set the axios instance to the mocked axios instance
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (httpClient as any).axiosInstance = mockAxiosInstance;

  // Define the URL
  const url = 'http://example.com';

  // Make the GET request
  // @ts-expect-error: Unreachable code error
  const response = await httpClient.get(url);

  // Assert that axiosInstance.get was called with the correct arguments
  expect(mockAxiosInstance.get).toHaveBeenCalledWith(url, config);

  // Assert that the response matches the expected error response
  expect(response).toEqual(axiosError);
});
