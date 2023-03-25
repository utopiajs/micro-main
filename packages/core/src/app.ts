import { type RunTimeLayoutConfig } from '@umijs/max';

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
    breakpoint: 'xs',
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
              path: '/user-center',
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
