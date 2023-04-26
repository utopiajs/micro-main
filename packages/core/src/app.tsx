import { HeaderRightContent } from '@/components';
import { clientConstantProps } from '@/constants';
import { coreUserApi } from '@/services';
import {
  history,
  useModel,
  type AntdConfig,
  type RuntimeAntdConfig,
  type RunTimeLayoutConfig
} from '@umijs/max';
import {
  getQueryParams,
  isApiSuccess,
  _Cookies
} from '@utopia/micro-main-utils';
import { type IInitialState } from '@utopia/micro-types';
import { theme, type ThemeConfig } from 'antd';

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

export const antd: RuntimeAntdConfig = (memo: AntdConfig) => {
  const nextTheme: ThemeConfig = {
    algorithm: theme.defaultAlgorithm
  };
  memo.theme = nextTheme;
  return memo;
};

export const layout: RunTimeLayoutConfig = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { initialState } = useModel('@@initialState');
  return {
    title: initialState?.client.clientName,
    layout: 'mix',
    siderWidth: 208,
    pure: Boolean(!initialState?.currentUser.id),
    rightContentRender: () => {
      return <HeaderRightContent />;
    },
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