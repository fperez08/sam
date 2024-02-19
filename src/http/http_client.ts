import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';

export default class HttpClient {
  protected config: AxiosRequestConfig;
  constructor(config: AxiosRequestConfig) {
    this.config = config;
  }
  public async get(url: string): Promise<AxiosResponse | undefined> {
    try {
      const axiosInstance = axios.create();
      const response = await axiosInstance.get(url, this.config);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.toJSON());
      return axiosError.response;
    }
  }
}
