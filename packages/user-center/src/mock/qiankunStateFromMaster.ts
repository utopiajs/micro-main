import type { QiankunStateFromMasterProps } from '@utopia/micro-types';

const qiankunStateFromMaster: Pick<
  QiankunStateFromMasterProps,
  'qiankunGlobalState'
> = {
  qiankunGlobalState: {
    currentUser: {
      id: '645f959388c7f418bad30d07',
      avatar:
        'http://qiniu-cdn.utopiajs.space/avatar/7c8d2d1c-eb9e-49b9-a6c2-efdb37615f29',
      name: 'KuangPF',
      email: 'me@kuangpf.com',
      preferenceSetting: {
        theme: 'dark',
        colorPrimary: '',
        borderRadius: 2
      }
    },
    client: {
      clientName: '微前端主平台',
      clientVersion: '1.0.0',
      copyRight: '1.0.0',
      logo: 'https://avatars.githubusercontent.com/u/53040934?s=200&v=4'
    },
    siteThemeConfig: {
      theme: 'light',
      colorPrimary: '#1890ff',
      borderRadius: 2
    }
  }
};

export default qiankunStateFromMaster;
