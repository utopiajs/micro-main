import { defineConfig } from '@umijs/max';

export default defineConfig({
  mfsu: {
    strategy: 'normal'
  },
  monorepoRedirect: {},
  routes: [
    {
      path: '/',
      component: 'index'
    },
    {
      path: '/user-center/*',
      microApp: 'user-center'
    }
  ],
  antd: {
    configProvider:{}
  },
  access: {},
  model: {},
  qiankun: {
    master: {}
  },
  initialState: {},
  request: {},
  layout: {},
  npmClient: 'npm',
  proxy: {
    '/api/micro-main/v1': {
      target: 'http://localhost:3000/'
    }
  }
});
