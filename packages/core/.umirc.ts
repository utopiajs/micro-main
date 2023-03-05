import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/', component: 'index' },
    { path: '/docs', component: 'docs' },
  ],
  plugins: ['@umijs/plugins/dist/qiankun'],
  qiankun: {
    master: {},
  },
  npmClient: 'npm',
});
