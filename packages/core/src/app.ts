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
    layout: 'mix'
  };
};
