// 站点主题相关
import { ISiteThemeConfig } from '@utopia/micro-types';
import { theme as antdTheme, type ThemeConfig } from 'antd';

const getAntdConfigProviderTheme = (
  siteThemeConfig?: Partial<ISiteThemeConfig>
): ThemeConfig => {
  if (siteThemeConfig?.theme) {
    const { theme, colorPrimary, borderRadius } = siteThemeConfig;
    return {
      algorithm:
        theme === 'light'
          ? antdTheme.defaultAlgorithm
          : antdTheme.darkAlgorithm,
      token: {
        colorPrimary,
        borderRadius
      }
    };
  }

  return {};
};
export { getAntdConfigProviderTheme };
