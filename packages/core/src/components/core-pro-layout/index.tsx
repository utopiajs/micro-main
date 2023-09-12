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
import { useSiteToken } from '@utopia/micro-main-utils';
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

const CoreProLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuSelectedKeys, setMenuSelectedKeys] = useState<string[]>([]); // 菜单选择 keys，受控，主要适配外部链接
  const { qiankunGlobalState } = useModel('@@qiankunStateForSlave');

  const {
    token: { colorPrimary, controlItemBgActive, colorBgElevated }
  } = useSiteToken();
  const location = useLocation();
  const navigate = useNavigate();
  const outlet = useOutlet();

  const menuActionRef = useRef<{
    reload: () => void;
  }>();

  const { client, menuConfigUserTree, currentUser } = qiankunGlobalState;
  const headerContentJSX = useMemo(() => <HeaderRightContent />, []);

  const handleIframeLink = useCallback((menu) => {
    setMenuSelectedKeys([menu.key]);
    if (menu.target === '_blank') {
      window.open(menu.path, '_blank');
    } else {
      history.push(`/micro-main-core/iframe/${encodeURIComponent(menu.path)}`);
    }
  }, []);

  const handlePageChange = useCallback((_location) => {
    const selectedKey = _location.pathname;
    if (!selectedKey.startsWith('/micro-main-core/iframe/')) {
      setMenuSelectedKeys([selectedKey]);
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

  useEffect(() => {
    menuActionRef.current?.reload();
  }, [menuConfigUserTree]);

  return (
    <ProLayout
      title={client.clientName}
      layout="mix"
      siderWidth={208}
      logo={client.logo}
      pure={Boolean(!currentUser.id)}
      onMenuHeaderClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        navigate('/');
      }}
      selectedKeys={menuSelectedKeys}
      onPageChange={handlePageChange}
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
