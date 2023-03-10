import { defineConfig } from 'umi';

export default defineConfig({
  mfsu: {
    exclude: ['@utopia/micro-main-utils'],
  },
  publicPath: '/', //https://github.com/umijs/qiankun/issues/1953
  base: '/user-center/',
  routes: [{ path: '/base-info', component: 'base-info' }],
  plugins: ['@umijs/plugins/dist/qiankun'],
  qiankun: {
    slave: {},
  },
  npmClient: 'npm',
});
