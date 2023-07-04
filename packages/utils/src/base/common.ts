import Cookies from 'js-cookie';
import { ERROR_CODE } from '../constants';

const isDev = () => process.env.NODE_ENV?.trim() !== 'production';

const getQueryParams = (url: string = window.location.search) => {
  const params: {
    [key: string]: string;
  } = {};

  url.replace(/([^?&]+)=([^&]+)/g, (_, k: string, v: string) => {
    params[k] = v;
    return '';
  });

  return params;
};

const isApiSuccess = (errCode: string) => errCode === ERROR_CODE;

const removeEmptyFields = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== null && v !== undefined && v !== ''
    )
  );
};
const _Cookies = Cookies;

export { isDev, getQueryParams, isApiSuccess, _Cookies, removeEmptyFields };
