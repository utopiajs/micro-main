import { message as _message } from 'antd';
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios';
import { PUB_SUB_TYPES } from '../constants';
import { getToken } from './auth';
import { getRawType, _Cookies } from './common';

interface IRawResponseData {
  /** 接口内部错误码，反应接口具体错误信息，'0000000000' 表示响应成功 */
  errorCode: string;
  /** 接口提示信息 */
  message: string;
  [key: string]: unknown;
}
export interface RestRequestConfig {
  /** 是否显示错误信息 */
  showErrorMessage?: boolean;
  /** 是否显示成功提示信息 */
  showSuccessMessage?: boolean;
  /** 是否显示 api loading */
  showApiLoadingStatus?: boolean;
  /** 下载文件名称 */
  downloadFileName?: string;
}
export interface FullRequestParams
  extends AxiosRequestConfig,
    RestRequestConfig {}

export interface ApiConfig extends AxiosRequestConfig {
  customApi?: string;
}
export type RequestParams = Omit<
  FullRequestParams,
  'data' | 'method' | 'params' | 'url'
>;

type TUpdateApiLoadingStatus = 'increase' | 'decrease';
type TResponse = Omit<AxiosResponse, 'config'> & {
  config: InternalAxiosRequestConfig & RestRequestConfig;
};
const defaultAxiosConfig: Pick<
  AxiosRequestConfig,
  'timeout' | 'validateStatus'
> = {
  timeout: 1000 * 60,
  validateStatus: (status) => status >= 200 && status < 600 // for better message tip
};

const SUCCESS_ERROR_CODE = '0000000000';
const DEFAULT_ERROR_MESSAGE = '网络错误，请稍后重试';
const apiLoadingInfo = {
  count: 0
};
const handleUpdateApiLoadingStatus = (type: TUpdateApiLoadingStatus) => {
  switch (type) {
    case 'increase':
      apiLoadingInfo.count += 1;
      break;
    case 'decrease':
      apiLoadingInfo.count -= 1;
      break;
    default:
      apiLoadingInfo.count = 0;
      break;
  }

  window._MICRO_MAIN_CORE_PUB_SUB_?.publish(
    PUB_SUB_TYPES.UPDATE_API_LOADING_STATUS,
    {
      loading: Boolean(apiLoadingInfo.count > 0)
    }
  );
};

class HttpClient {
  private instance: AxiosInstance;

  constructor(axiosConfig: ApiConfig = {}) {
    this.instance = axios.create({ ...defaultAxiosConfig, ...axiosConfig });
    // interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig & RestRequestConfig) => {
        if (config.showApiLoadingStatus) {
          // add global loading
          handleUpdateApiLoadingStatus('increase');
        }

        // token
        config.headers.Authorization = `Bearer ${getToken()}`;
        // user info
        config.headers.User = `usercode:${_Cookies.get('id')}`;
        return config;
      }
    );
    // handle response data
    this.instance.interceptors.response.use(
      (response: TResponse) => {
        if (response.config.showApiLoadingStatus) {
          // remove global loading
          handleUpdateApiLoadingStatus('decrease');
        }
        const rawResponseData: IRawResponseData = response.data;
        const { errorCode, message } = rawResponseData;
        if (errorCode !== SUCCESS_ERROR_CODE) {
          return Promise.reject(new Error(message));
        }
        return response;
      },
      (error) => {
        handleUpdateApiLoadingStatus('decrease');
        return Promise.reject(error);
      }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  public request = <T = unknown, _E = unknown>(
    requestParams: FullRequestParams
  ): Promise<T> => {
    const { showErrorMessage } = requestParams;
    return this.instance
      .request(requestParams)
      .then((response: TResponse) => {
        const {
          data: responseData,
          headers,
          config: { downloadFileName }
        } = response;
        const responseDataTypeIsStream = ['ArrayBuffer', 'Uint8Array'].includes(
          getRawType(responseData)
        );

        if (responseDataTypeIsStream) {
          // 针对于一些流文件
          const resultBlob = new Blob([responseData], {
            type: headers['content-type']
          });
          const fileUrl = URL.createObjectURL(resultBlob);

          const downloadElement = document.createElement('a');
          document.body.appendChild(downloadElement);
          downloadElement.href = fileUrl;
          downloadElement.download =
            downloadFileName ||
            headers['content-disposition']?.split('=')[1] ||
            `文件导出${new Date().getTime()}.json`; // 如果服务器设置了下载文件名称
          downloadElement.click();

          window.URL.revokeObjectURL(fileUrl);
          return {};
        }
        return response.data;
      })
      .catch((error) => {
        if (showErrorMessage) {
          _message.error(error?.message || DEFAULT_ERROR_MESSAGE);
        }
        return error;
      });
  };
}

const baseRequest = new HttpClient().request;

export { baseRequest, HttpClient };
