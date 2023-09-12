import { defineConfig } from '@umijs/max';

export default defineConfig({
  mfsu: {
    strategy: 'normal'
  },
  monorepoRedirect: {},
  publicPath: '/user-center/', //https://github.com/umijs/qiankun/issues/1953
  base: '/user-center/',
  routes: [
    { path: '/base-info', component: 'base-info' },
    { path: '/preference-setting', component: 'preference-setting' },
    {
      path: '/general-manage/user-list',
      component: 'general-manage/user-list'
    },
    {
      path: '/general-manage/role-list',
      component: 'general-manage/role-list'
    },
    {
      path: '/sys-setting/route-config',
      component: 'sys-setting/route-config'
    },
    { path: '/login', component: 'login' },
    { path: '/*', component: '@/pages/404/index.tsx' }
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
