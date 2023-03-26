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
    { path: '/docs', component: 'docs' },
    {
      path: '/user-center/*',
      microApp: 'user-center'
    }
  ],
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {},
  npmClient: 'npm'
});
