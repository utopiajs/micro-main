import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    {
      path: '/',
      component: 'index',
    },
    { path: '/docs', component: 'docs' },
    {
      path: '/user-center/*',
      microApp: 'user-center',
    },
  ],
  plugins: ['@umijs/plugins/dist/qiankun'],
  qiankun: {
    master: {},
  },
  npmClient: 'npm'
});
