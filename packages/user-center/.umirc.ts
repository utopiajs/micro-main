import { defineConfig } from 'umi';

export default defineConfig({
  publicPath: '/user-center/',
  base: '/user-center/',
  routes: [{ path: '/base-info', component: 'base-info' }],
  plugins: ['@umijs/plugins/dist/qiankun'],
  qiankun: {
    slave: {},
  },
  npmClient: 'npm',
});
