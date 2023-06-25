import { type IInitialState } from '@utopia/micro-types';

const qiankunStateFromMaster: { initialState: IInitialState } = {
  initialState: {
    currentUser: {
      id: '645f959388c7f418bad30d07',
      avatar:
        'http://qiniu-cdn.utopiajs.space/avatar/7c8d2d1c-eb9e-49b9-a6c2-efdb37615f29',
      name: 'KuangPF',
      email: 'me@kuangpf.com',
      preferenceSetting: {}
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
      borderRadius: 6
    }
  }
};

export default qiankunStateFromMaster;
