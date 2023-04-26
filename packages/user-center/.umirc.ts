import { defineConfig } from '@umijs/max';

export default defineConfig({
  mfsu: {
    strategy: 'normal',
    shared: {
      react: {
        singleton: true,
        eager: true
      },
      'react-dom': {
        singleton: true,
        eager: true
      }
    }
  },
  monorepoRedirect: {
    srcDir: ['dist/esm']
  },
  publicPath: '/', //https://github.com/umijs/qiankun/issues/1953
  base: '/user-center/',
  routes: [
    { path: '/base-info', component: 'base-info' },
    { path: '/login', component: 'login' }
  ],
  model: {},
  qiankun: {
    slave: {}
  },
  npmClient: 'npm'
});
