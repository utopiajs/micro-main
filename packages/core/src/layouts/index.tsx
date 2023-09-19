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

  return (
    <ConfigProvider theme={siteAntdThemeConfig}>
      <CoreProLayout />
    </ConfigProvider>
  );
}
