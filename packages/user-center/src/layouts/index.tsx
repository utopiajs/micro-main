import qiankunStateFromMaster from '@/mock/qiankunStateFromMaster';
import { Outlet, useModel } from '@umijs/max';
import {
  getAntdConfigProviderTheme,
  PUB_SUB_TYPES
} from '@utopia/micro-main-utils';
import type { QiankunStateForSlaveProps } from '@utopia/micro-types';
import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import OutletWrap from './outlet-wrap';

export default function Layout() {
  const { initialState }: QiankunStateForSlaveProps =
    useModel('@@qiankunStateFromMaster') || qiankunStateFromMaster;
  const [siteAntdThemeConfig, setSiteAntdThemeConfig] = useState(
    getAntdConfigProviderTheme(initialState?.siteThemeConfig)
  );

  useEffect(() => {
    window._MICRO_MAIN_CORE_PUB_SUB_?.subscribe(
      PUB_SUB_TYPES.UPDATE_SITE_THEME_CONFIG,
      (payload) => {
        setSiteAntdThemeConfig(payload);
      }
    );
  }, []);

  return (
    <ConfigProvider theme={siteAntdThemeConfig}>
      <OutletWrap>
        <Outlet />
      </OutletWrap>
    </ConfigProvider>
  );
}
