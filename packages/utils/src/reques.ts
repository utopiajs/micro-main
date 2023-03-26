// 基于 axios 封装请求库
import axios from 'axios';
import { getToken } from './auth';

const TIME_OUT = 1 * 60 * 1000;

const request = axios.create({
  baseURL: '',
  timeout: TIME_OUT
});

request.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers.Authorization = getToken();
    }
    return config;
  },
  (error) => {
    // do something with request error
    return Promise.reject(error);
  }
);

request.interceptors.response.use((response) => {
  console.log(response);
  return response;
});
export default request;
