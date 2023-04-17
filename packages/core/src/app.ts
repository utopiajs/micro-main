import { clientConstantProps } from '@/constants';
import { coreUserApi } from '@/services';
import { type IClientConstantProps, type User } from '@/types';
import { history, useModel, type RunTimeLayoutConfig } from '@umijs/max';
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

export async function getInitialState(): Promise<{
  currentUser: User;
  client: Partial<IClientConstantProps>;
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
      currentUser,
      client: clientConstantProps
    };
  }

  return {
    currentUser: {},
    client: {}
  };
}
