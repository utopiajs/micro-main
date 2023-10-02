import Cookies from 'js-cookie';
import { cloneDeep } from 'lodash-es';
import { v4 as uuidv4 } from 'uuid';
import { ERROR_CODE } from '../constants';

type NonNullableProperties<T> = {
  [K in keyof T]: Exclude<T[K], undefined | null | ''>;
};

const _Cookies = Cookies;
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
  const nextTreeList = cloneDeep(treeList);
  const { childrenKey = 'children', ignoreParentNode = false } = rest[0] ?? {};
  nextTreeList.forEach((item) => {
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

/**
 * 判断树形结构中是否包含某项
 */
function findItemInTree(tree, condition, ...rest) {
  const { childrenKey = 'children' } = rest[0] ?? {};
  for (let i = 0; i < tree.length; i += 1) {
    const node = tree[i];
    if (condition(node)) {
      return node;
    }
    if (tree[childrenKey]) {
      const foundItem = findItemInTree(tree.children, condition, ...rest);
      if (foundItem) {
        return foundItem;
      }
    }
  }

  return null;
}

/**
 * 页面缺省字段填充
 * @param value 字段原始值
 * @param fillText 填充默认值
 */
function renderDefaultField(value, fillText = '--') {
  if (value === 0) {
    return value;
  }

  return value || fillText;
}

/**
 * 判断是不是一个 url
 * @param  {string|undefined} path
 * @returns boolean
 */
const isUrl = (path: string | undefined): boolean => {
  if (!path) return false;
  if (!path.startsWith('http')) {
    return false;
  }
  try {
    const url = new URL(path);
    return !!url;
  } catch (error) {
    return false;
  }
};

export {
  isDev,
  getQueryParams,
  isApiSuccess,
  _Cookies,
  uuidv4,
  isUrl,
  removeEmptyFields,
  convertArrayFromTree,
  findItemInTree,
  renderDefaultField
};
