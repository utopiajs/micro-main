import { HeaderRightContent } from '@/components';
import { ProLayout, type MenuDataItem } from '@ant-design/pro-components';
import { Link, Outlet, useLocation, useModel, useNavigate } from '@umijs/max';
import { PUB_SUB_TYPES } from '@utopia/micro-types';
import { ConfigProvider, theme as antdTheme, type ThemeConfig } from 'antd';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';

type MenuItemProps = MenuDataItem & {
  isUrl: boolean;
  onClick: () => void;
};

export default function Layout() {
  const { initialState } = useModel('@@initialState');
  const [siteThemeConfig, setSiteThemeConfig] = useState(
    initialState?.siteThemeConfig
  );

  const location = useLocation();
  const navigate = useNavigate();
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
    window._MICRO_MAIN_CORE_PUB_SUB_.subscribe(
      PUB_SUB_TYPES.GET_SITE_THEME_VALUE,
      (payload) => {
        const _siteThemeConfig = getSiteThemeConfig(payload);
        setSiteThemeConfig(_siteThemeConfig);
        window._MICRO_MAIN_CORE_PUB_SUB_.publish(
          PUB_SUB_TYPES.UPDATE_SITE_THEME_CONFIG,
          _siteThemeConfig
        );
      }
    );
  }, [getSiteThemeConfig]);

  return (
    <ConfigProvider theme={siteThemeConfig}>
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
          pageContainer: {
            paddingBlockPageContainerContent: 12,
            paddingInlinePageContainerContent: 12
          }
        }}
      >
        <Outlet />
      </ProLayout>
    </ConfigProvider>
  );
}
