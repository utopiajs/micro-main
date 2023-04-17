import { coreUserApi } from '@/services';
import { type User } from '@/types';
import { history, type RunTimeLayoutConfig } from '@umijs/max';
import { _Cookies } from '@utopia/micro-main-utils';

const loginPath = '/user-center/login';
export const qiankun = {
  apps: [
    {
      name: 'user-center',
      entry: '//localhost:9001'
    }
  ]
};

export const layout: RunTimeLayoutConfig = () => {
  return {
    title: '微前端主平台',
    layout: 'mix',
    siderWidth: 208,
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

export async function getInitialState(): Promise<{
  currentUser: User;
}> {
  const fetchUserInfo = async () => {
    const userId = _Cookies.get('id');
    try {
      const result = await coreUserApi.usersInfoWithGet({ userId });
      return result.data;
    } catch (error) {
      history.push(loginPath);
    }
    return {};
  };

  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      currentUser
    };
  }

  return {
    currentUser: {}
  };
}
