import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';

export default class HttpClient {
  protected config: AxiosRequestConfig;
  protected axiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.config = config;
    this.axiosInstance = axios.create();
  }
  public async get(url: string): Promise<AxiosResponse | undefined> {
    try {
      const response = await this.axiosInstance.get(url, this.config);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.toJSON());
      return axiosError.response;
    }
  }
}
