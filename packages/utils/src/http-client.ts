import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios';
import { getToken } from './index';

interface IRawResponseData {
  /** 接口内部错误码，反应接口具体错误信息，'0000000000' 表示响应成功 */
  errorCode: string;
  /** 接口提示信息 */
  message: string;
  [key: string]: unknown;
}
export interface FullRequestParams extends AxiosRequestConfig {}
export interface ApiConfig extends AxiosRequestConfig {}

const defaultAxiosConfig: Pick<AxiosRequestConfig, 'timeout'> = {
  timeout: 1000 * 60
};
const SUCCESS_ERROR_CODE = '0000000000';

class HttpClient {
  private instance: AxiosInstance;

  constructor(axiosConfig: ApiConfig = {}) {
    this.instance = axios.create({ ...defaultAxiosConfig, ...axiosConfig });
    // interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // token
        config.headers.Authorization = `Bearer ${getToken()}`;
        return config;
      }
    );
    // handle response data
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const rawResponseData: IRawResponseData = response.data;
        const { errorCode, message } = rawResponseData;
        if (errorCode !== SUCCESS_ERROR_CODE) {
          return Promise.reject(new Error(message));
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public request = (requestParams: FullRequestParams) => {
    return this.instance
      .request(requestParams)
      .then((response) => response.data);
  };
}

const baseRequest = new HttpClient().request;

export { baseRequest };
