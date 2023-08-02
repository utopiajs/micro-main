import { CoreProLayout } from '@/components';
import { useModel } from '@umijs/max';
import {
  getAntdConfigProviderTheme,
  usePrefersColor,
  PUB_SUB_TYPES
} from '@utopia/micro-main-utils';
import type { User } from '@utopia/micro-types';
import { ConfigProvider, theme as antdTheme, type ThemeConfig } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import './index.less';

const PREFERS_LS_KEY = 'micro-main:user-prefers';
const DEFAULT_PRIMARY_COLOR = '#1677EF';

function updateCssVariables(variables: { [key: string]: string }) {
  const root = document.documentElement;

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(variables)) {
    root.style.setProperty(key, value);
  }
}
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
    const userPrefers: User['preferenceSetting'] = JSON.parse(
      localStorage.getItem(PREFERS_LS_KEY) || '{}'
    );
    setPrefersColor(
      initialState?.siteThemeConfig?.theme || userPrefers.theme || 'light'
    );

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
  }, [getSiteThemeConfig, setPrefersColor, initialState]);

  updateCssVariables({
    '--micro-core-primary-color':
      siteAntdThemeConfig.token?.colorPrimary || DEFAULT_PRIMARY_COLOR
  });

  return (
    <ConfigProvider theme={siteAntdThemeConfig}>
      <CoreProLayout />
    </ConfigProvider>
  );
}
