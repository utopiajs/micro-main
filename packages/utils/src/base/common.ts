import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { ERROR_CODE } from '../constants';

type NonNullableProperties<T> = {
  [K in keyof T]: Exclude<T[K], undefined | null | ''>;
};
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

function removeEmptyFields<T extends Record<string, any>>(
  obj: T
): NonNullableProperties<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== null && v !== undefined && v !== ''
    )
  ) as NonNullableProperties<T>;
}

function convertArrayFromTree(
  treeList: any[],
  resultList: any[] = [],
  ...rest
) {
  const { childrenKey = 'children', ignoreParentNode = false } = rest[0] ?? {};
  treeList.forEach((item) => {
    if (item[childrenKey]) {
      convertArrayFromTree(item[childrenKey], resultList, ...rest);
      delete item[childrenKey];
      if (!ignoreParentNode) {
        resultList.push(item);
      }
    } else {
      resultList.push(item);
    }
  });

  return resultList;
}

const _Cookies = Cookies;

export {
  isDev,
  getQueryParams,
  isApiSuccess,
  _Cookies,
  uuidv4,
  removeEmptyFields,
  convertArrayFromTree
};
