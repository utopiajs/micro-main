import { convertMenuData } from '@/utils';
import type { MenuDataItem } from '@ant-design/pro-components';
import { ProLayout } from '@ant-design/pro-components';
import {
  history,
  Link,
  useLocation,
  useModel,
  useNavigate,
  useOutlet
} from '@umijs/max';
import {
  ROUTE_LOGIN_PATH,
  ROUTE_REGISTER_PATH,
  useSiteToken
} from '@utopia/micro-main-utils';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import HeaderRightContent from '../header-right-content';
import Styles from './index.less';
import MenuCollapseButton from './menu-collapse-button';
import OutletWrap from './outlet-wrap';

type MenuItemProps = MenuDataItem & {
  isUrl: boolean;
  onClick: () => void;
};

function updateCssVariables(variables: { [key: string]: string }) {
  const root = document.documentElement;

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(variables)) {
    root.style.setProperty(key, value);
  }
}

const CoreProLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { qiankunGlobalState } = useModel('@@qiankunStateForSlave');

  const {
    token: { colorPrimary, controlItemBgActive, colorBgElevated, colorText }
  } = useSiteToken();
  const location = useLocation();
  const navigate = useNavigate();
  const outlet = useOutlet();

  const menuActionRef = useRef<{
    reload: () => void;
  }>();

  const { clientConfig, menuConfigUserTree } = qiankunGlobalState;
  const headerContentJSX = useMemo(() => <HeaderRightContent />, []);

  const handleIframeLink = useCallback((menu) => {
    if (menu.target === '_blank') {
      window.open(menu.path, '_blank');
    } else {
      history.push(`/micro-main-core/iframe/${encodeURIComponent(menu.path)}`);
    }
  }, []);

  const menuItemRender = useCallback(
    (menuItemProps: MenuItemProps, defaultDom: React.ReactNode) => {
      // eg. http://www.xxx.com
      if (menuItemProps.isUrl) {
        return (
          <div
            className="ant-menu-submenu-url"
            onClick={() => {
              handleIframeLink(menuItemProps);
            }}
          >
            <div style={{ pointerEvents: 'none' }}>{defaultDom}</div>
          </div>
        );
      }
      if (menuItemProps.children) {
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
    [location.pathname, handleIframeLink]
  );

  const isProLayoutWithPureModel = useCallback(() => {
    // login & register page
    return [ROUTE_LOGIN_PATH, ROUTE_REGISTER_PATH].includes(location.pathname);
  }, [location]);

  useEffect(() => {
    menuActionRef.current?.reload();
  }, [menuConfigUserTree]);

  useEffect(() => {
    updateCssVariables({
      '--micro-core-primary-color': colorPrimary,
      '--micro-core-color-text': colorText
    });
  }, [colorPrimary, colorText]);
  return (
    <ProLayout
      title={clientConfig.name}
      layout="mix"
      // splitMenus
      headerRender={undefined} // undefined || false
      menuRender={undefined} // undefined || false
      siderWidth={208}
      logo={clientConfig.logo}
      pure={isProLayoutWithPureModel()}
      onMenuHeaderClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        navigate('/');
      }}
      rightContentRender={() => headerContentJSX}
      menuItemRender={menuItemRender}
      collapsedButtonRender={false}
      collapsed={collapsed}
      onCollapse={setCollapsed}
      links={[
        <MenuCollapseButton collapsed={collapsed} onCollapse={setCollapsed} />
      ]}
      className={Styles['micro-main-core-layout']}
      actionRef={menuActionRef}
      menu={{
        locale: false,
        request: async () => {
          const convertedMenuData = convertMenuData(menuConfigUserTree || []);
          return convertedMenuData;
        }
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
