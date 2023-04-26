import { HeaderRightContent } from '@/components';
import { ProLayout, type MenuDataItem } from '@ant-design/pro-components';
import { Link, Outlet, useLocation, useModel } from '@umijs/max';
import { useCallback, useMemo, type ReactNode } from 'react';

type MenuItemProps = MenuDataItem & {
  isUrl: boolean;
  onClick: () => void;
};

export default function Layout() {
  const { initialState } = useModel('@@initialState');
  const location = useLocation();
  const headerContentJSX = useMemo(() => <HeaderRightContent />, []);
  const menuItemRender = useCallback(
    (menuItemProps: MenuItemProps, defaultDom: ReactNode) => {
      if (menuItemProps.isUrl || menuItemProps.children) {
        return defaultDom;
      }
      if (menuItemProps.path && location.pathname !== menuItemProps.path) {
        return (
          // handle wildcard route path, for example /slave/* from qiankun
          <Link
            to={menuItemProps.path.replace('/*', '')}
            target={menuItemProps.target}
          >
            {defaultDom}
          </Link>
        );
      }
      return defaultDom;
    },
    [location.pathname]
  );
  return (
    <ProLayout
      title={initialState?.client.clientName}
      layout="mix"
      siderWidth={208}
      pure={Boolean(!initialState?.currentUser.id)}
      rightContentRender={() => headerContentJSX}
      menuItemRender={menuItemRender}
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
