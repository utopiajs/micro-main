import { CoreProLayout } from '@/components';
import { useModel } from '@umijs/max';
import {
  getAntdConfigProviderTheme,
  usePrefersColor
} from '@utopia/micro-main-utils';
import { PUB_SUB_TYPES } from '@utopia/micro-types';
import { ConfigProvider, theme as antdTheme, type ThemeConfig } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import './index.less';

export default function Layout() {
  const { initialState } = useModel('@@initialState');
  const [siteAntdThemeConfig, setAntdSiteThemeConfig] = useState(
    getAntdConfigProviderTheme(initialState?.siteThemeConfig)
  );
  const [, , setPrefersColor] = usePrefersColor();

  const getSiteThemeConfig = useCallback((siteTheme) => {
    const { theme, colorPrimary, borderRadius } = siteTheme;
    const nextSiteThemeConfig: ThemeConfig = {
      algorithm:
        theme === 'light'
          ? antdTheme.defaultAlgorithm
          : antdTheme.darkAlgorithm,
      token: {
        colorPrimary,
        borderRadius
      }
    };

    return nextSiteThemeConfig;
  }, []);

  useEffect(() => {
    setPrefersColor('light');
    window._MICRO_MAIN_CORE_PUB_SUB_.subscribe(
      PUB_SUB_TYPES.GET_SITE_THEME_VALUE,
      (payload) => {
        const _siteThemeConfig = getSiteThemeConfig(payload);
        setAntdSiteThemeConfig(_siteThemeConfig);
        window._MICRO_MAIN_CORE_PUB_SUB_.publish(
          PUB_SUB_TYPES.UPDATE_SITE_THEME_CONFIG,
          _siteThemeConfig
        );
        setPrefersColor(payload.theme);
      }
    );
  }, [getSiteThemeConfig, setPrefersColor]);

  return (
    <ConfigProvider theme={siteAntdThemeConfig}>
      <CoreProLayout />
    </ConfigProvider>
  );
}
