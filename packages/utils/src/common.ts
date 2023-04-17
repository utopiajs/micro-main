import Cookies from 'js-cookie';

const isDev = () => process.env.NODE_ENV?.trim() !== 'production';
const _Cookies = Cookies;

export { isDev, _Cookies };
