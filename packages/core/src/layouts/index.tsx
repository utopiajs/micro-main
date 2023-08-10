import { CoreProLayout } from '@/components';
import { useModel } from '@umijs/max';
import {
  useAntdProviderConfigTheme,
  usePrefersColor
} from '@utopia/micro-main-utils';
import type { User } from '@utopia/micro-types';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
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
  const { qiankunGlobalState } = useModel('@@qiankunStateForSlave');
  const { siteAntdThemeConfig } =
    useAntdProviderConfigTheme(qiankunGlobalState);
  const [, , setPrefersColor] = usePrefersColor();

  useEffect(() => {
    const userPrefers: User['preferenceSetting'] = JSON.parse(
      localStorage.getItem(PREFERS_LS_KEY) || '{}'
    );
    setPrefersColor(
      qiankunGlobalState?.siteThemeConfig?.theme || userPrefers.theme || 'light'
    );
  }, [setPrefersColor, qiankunGlobalState]);

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
