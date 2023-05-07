import { ISiteThemeConfig } from '@utopia/micro-types';

// 站点主题基础配置使用自定义字段，便于灵活存储，如果兼容 antd ConfigProvider，做对应转换即可
const siteThemeConfig: ISiteThemeConfig = {
  theme: 'light',
  colorPrimary: '#1677FF',
  borderRadius: 4
};

export { siteThemeConfig };
