import { Outlet, useModel } from '@umijs/max';
import { getAntdConfigProviderTheme } from '@utopia/micro-main-utils';
import { PUB_SUB_TYPES, type IInitialState } from '@utopia/micro-types';
import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';

import styles from './index.less';

export default function Layout() {
  const { initialState }: { initialState: IInitialState } =
    useModel('@@qiankunStateFromMaster') || {};
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
      <div
        className={styles['user-center-main-content']}
        style={{ padding: `${initialState.currentUser.id ? '15px' : ''}` }}
      >
        <Outlet />
      </div>
    </ConfigProvider>
  );
}
