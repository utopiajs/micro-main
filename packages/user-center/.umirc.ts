import { defineConfig } from '@umijs/max';

export default defineConfig({
  mfsu: {
    strategy: 'normal',
  },
  monorepoRedirect: {},
  publicPath: '/', //https://github.com/umijs/qiankun/issues/1953
  base: '/user-center/',
  routes: [
    { path: '/base-info', component: 'base-info' },
    { path: '/preference-setting', component: 'preference-setting' },
    { path: '/general-manage/user-list', component: 'general-manage/user-list' },
    { path: '/login', component: 'login' }
  ],
  model: {},
  qiankun: {
    slave: {}
  },
  npmClient: 'npm',
  proxy: {
    '/api/micro-main/v1': {
      target: 'http://localhost:3000/'
    }
  }
});
