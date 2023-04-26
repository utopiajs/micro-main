import { HeaderRightContent } from '@/components';
import { ProLayout } from '@ant-design/pro-components';
import { Outlet, useModel } from '@umijs/max';
import { useMemo } from 'react';

export default function Layout() {
  const { initialState } = useModel('@@initialState');

  const headerContentJSX = useMemo(() => <HeaderRightContent />, []);
  return (
    <ProLayout
      title={initialState?.client.clientName}
      layout="mix"
      siderWidth={208}
      pure={Boolean(!initialState?.currentUser.id)}
      rightContentRender={() => headerContentJSX}
      menu={{
        request: () =>
          new Promise((resolve) => {
            resolve([
              {
                name: '用户管理',
                path: '/user-center/',
                children: [
                  {
                    name: '用户信息',
                    path: '/user-center/base-info'
                  }
                ]
              }
            ]);
          })
      }}
    >
      <Outlet />
    </ProLayout>
  );
}
