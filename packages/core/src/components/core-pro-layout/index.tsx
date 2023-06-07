import { ProLayout, type MenuDataItem } from '@ant-design/pro-components';
import {
  Link,
  useLocation,
  useModel,
  useNavigate,
  useOutlet
} from '@umijs/max';
import { useSiteToken } from '@utopia/micro-main-utils';
import React, { useCallback, useMemo } from 'react';
import HeaderRightContent from '../header-right-content';
import Styles from './index.less';
import OutletWrap from './outlet-wrap';

type MenuItemProps = MenuDataItem & {
  isUrl: boolean;
  onClick: () => void;
};

const CoreProLayout: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const {
    token: { colorPrimary, controlItemBgActive, colorBgElevated }
  } = useSiteToken();
  const location = useLocation();
  const navigate = useNavigate();
  const outlet = useOutlet();

  const headerContentJSX = useMemo(() => <HeaderRightContent />, []);

  const menuItemRender = useCallback(
    (menuItemProps: MenuItemProps, defaultDom: React.ReactNode) => {
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
      logo={initialState?.client.logo}
      pure={Boolean(!initialState?.currentUser.id)}
      onMenuHeaderClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        navigate('/');
      }}
      rightContentRender={() => headerContentJSX}
      menuItemRender={menuItemRender}
      collapsedButtonRender={false}
      className={Styles['micro-main-core-layout']}
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
                  },
                  {
                    name: '偏好设置',
                    path: '/user-center/preference-setting'
                  }
                ]
              }
            ]);
          })
      }}
      token={{
        sider: {
          colorTextMenuSelected: colorPrimary,
          colorBgMenuItemSelected: controlItemBgActive,
          colorBgMenuItemHover: colorPrimary,
          colorMenuBackground: colorBgElevated,
          paddingBlockLayoutMenu: 0,
          paddingInlineLayoutMenu: 0
        },
        pageContainer: {
          paddingBlockPageContainerContent: 0,
          paddingInlinePageContainerContent: 0
        }
      }}
    >
      <OutletWrap>{outlet}</OutletWrap>
    </ProLayout>
  );
};

export default CoreProLayout;