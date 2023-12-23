import { useAntdProviderConfigTheme } from '@/hooks';
import qiankunStateFromMaster from '@/mock/qiankunStateFromMaster';
import { Outlet, useModel } from '@umijs/max';
import type { QiankunStateFromMasterProps } from '@utopia/micro-types';
import { ConfigProvider } from 'antd';
import OutletWrap from './outlet-wrap';

export default function Layout() {
  const { qiankunGlobalState }: QiankunStateFromMasterProps =
    useModel('@@qiankunStateFromMaster') || qiankunStateFromMaster;
  const { siteAntdThemeConfig } =
    useAntdProviderConfigTheme(qiankunGlobalState);

  return (
    <ConfigProvider theme={siteAntdThemeConfig}>
      <OutletWrap>
        <Outlet />
      </OutletWrap>
    </ConfigProvider>
  );
}
