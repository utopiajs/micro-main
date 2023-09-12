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
    {
      path: '/user-center/*',
      microApp: 'user-center',
      microAppProps: {
        autoSetLoading: true
      }
    },
    {
      path: '/micro-main-core/iframe/:iframeSrc',
      component: '@/pages/micro-main-iframe/index.tsx'
    },
    { path: '/*', component: '@/pages/404/index.tsx' }
  ],
  antd: {
    configProvider: {}
  },
  access: {},
  model: {},
  qiankun: {
    master: {
      defaultLoader: '@/components/micro-app-loading'
    }
  },
  initialState: {},
  request: {},
  npmClient: 'npm',
  proxy: {
    '/api/micro-main/v1': {
      target: 'http://localhost:3000/'
    }
  }
});
