import { defineConfig } from 'umi';

export default defineConfig({
  publicPath: '/user-center/',
  routes: [{ path: '/user-center/base-info', component: 'base-info' }],
  plugins: ['@umijs/plugins/dist/qiankun'],
  qiankun: {
    slave: {},
  },
  npmClient: 'npm',
});
