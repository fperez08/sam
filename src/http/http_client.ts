import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';
require('axios-debug-log');

export default class HttpClient {
  protected config: AxiosRequestConfig;
  protected axiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.config = config;
    this.axiosInstance = axios.create();
  }
  /**
   * Makes a GET request to the specified URL using the specified configuration.
   * @param url - The URL to make the GET request to.
   * @returns A Promise that resolves to an AxiosResponse or rejects with an AxiosError.
   */
  protected async get(url: string): Promise<AxiosResponse | AxiosError> {
    try {
      const response = await this.axiosInstance.get(url, this.config);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.toJSON());
      return axiosError;
    }
  }
}
