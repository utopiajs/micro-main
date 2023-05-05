import { Outlet, useModel } from '@umijs/max';
import { PUB_SUB_TYPES, type IInitialState } from '@utopia/micro-types';
import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';

import styles from './index.less';

export default function Layout() {
  const { initialState }: { initialState: IInitialState } =
    useModel('@@qiankunStateFromMaster') || {};
  const [siteThemeConfig, setSiteThemeConfig] = useState(
    initialState?.siteThemeConfig
  );

  useEffect(() => {
    window._MICRO_MAIN_CORE_PUB_SUB_?.subscribe(
      PUB_SUB_TYPES.UPDATE_SITE_THEME_CONFIG,
      (payload) => {
        setSiteThemeConfig(payload);
      }
    );
  }, []);

  return (
    <ConfigProvider theme={siteThemeConfig}>
      <div className={styles['user-center-main-content']}>
        <Outlet />
      </div>
    </ConfigProvider>
  );
}
