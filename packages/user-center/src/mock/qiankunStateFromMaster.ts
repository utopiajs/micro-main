import { type IInitialState } from '@utopia/micro-types';

const qiankunStateFromMaster: { initialState: IInitialState } = {
  initialState: {
    currentUser: {
      id: '123456789'
    },
    client: {
      clientName: '微前端主平台',
      clientVersion: '1.0.0',
      copyRight: '1.0.0',
      logo: 'https://avatars.githubusercontent.com/u/53040934?s=200&v=4'
    },
    siteThemeConfig: {
      theme: 'light',
      colorPrimary: '#49cc90',
      borderRadius: 6
    }
  }
};

export default qiankunStateFromMaster;
