import {
  ISiteThemeConfig,
  QiankunStateFromMasterProps
} from '@utopia/micro-types';

// 站点主题基础配置使用自定义字段，便于灵活存储，如果兼容 antd ConfigProvider，做对应转换即可
const siteThemeConfig: ISiteThemeConfig = {
  theme: 'light',
  colorPrimary: '#1677FF',
  borderRadius: 4
};

const DEFAULT_QIANKUN_GLOBAL_STATE: QiankunStateFromMasterProps['qiankunGlobalState'] =
  {
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
  };
export { siteThemeConfig, DEFAULT_QIANKUN_GLOBAL_STATE };
