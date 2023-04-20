import Cookies from 'js-cookie';
import { ERROR_CODE } from '../constants';

const isDev = () => process.env.NODE_ENV?.trim() !== 'production';
const isApiSuccess = (errCode: string) => errCode === ERROR_CODE;
const _Cookies = Cookies;

export { isDev, isApiSuccess, _Cookies };
