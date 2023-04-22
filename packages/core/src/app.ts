import { clientConstantProps } from '@/constants';
import { coreUserApi } from '@/services';
import { type IInitialState } from '@utopia/micro-types';
import { history, useModel, type RunTimeLayoutConfig } from '@umijs/max';
import {
  getQueryParams,
  isApiSuccess,
  _Cookies
} from '@utopia/micro-main-utils';

const loginPath = '/user-center/login';
const { redirectUrl = '/' } = getQueryParams();
export const qiankun = {
  apps: [
    {
      name: 'user-center',
      entry: '//localhost:9001'
    }
  ]
};

export const layout: RunTimeLayoutConfig = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { initialState } = useModel('@@initialState');
  return {
    title: initialState?.client.clientName,
    layout: 'mix',
    siderWidth: 208,
    pure: Boolean(!initialState?.currentUser.id),
    token: {
      header: {
        heightLayoutHeader: 48
      }
    },
    menu: {
      request: () =>
        new Promise((resolve) => {
          resolve([
            {
              name: '用户管理',
              path: '/user-center/',
              children: [
                {
                  name: '用户信息',
                  path: '/user-center/base-info'
                }
              ]
            }
          ]);
        })
    }
  };
};

export async function getInitialState(): Promise<IInitialState> {
  const { location } = history;
  const fetchUserInfo = async () => {
    const userId = _Cookies.get('id');
    const { errorCode, data } = await coreUserApi.usersInfoWithGet(
      { userId },
      { showErrorMessage: false }
    );
    if (isApiSuccess(errorCode)) {
      if (location.pathname === loginPath) {
        window.location.href = redirectUrl;
      }
      return data;
    }
    history.push(loginPath);
    return {};
  };

  const currentUser = await fetchUserInfo();
  return {
    currentUser,
    client: clientConstantProps
  };
}

// qiankun global data
export const useQiankunStateForSlave = (): { initialState: IInitialState } => {
  const { initialState } = useModel('@@initialState');

  return {
    initialState: {
      currentUser: initialState?.currentUser || {},
      client: initialState?.client || {}
    }
  };
};
