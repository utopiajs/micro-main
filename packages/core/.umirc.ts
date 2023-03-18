import { defineConfig } from 'umi';

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
    { path: '/docs', component: 'docs' },
    {
      path: '/user-center/*',
      microApp: 'user-center'
    }
  ],
  plugins: ['@umijs/plugins/dist/qiankun', '@umijs/plugins/dist/layout'],
  qiankun: {
    master: {}
  },
  layout: {},
  npmClient: 'npm'
});
