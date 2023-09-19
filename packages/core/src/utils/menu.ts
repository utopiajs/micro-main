// 将 menuData 转为 菜单侧边栏数据
import {
  HomeOutlined,
  LinkOutlined,
  MacCommandOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { isUrl, ROUTE_CORE_IFRAME_SRC } from '@utopia/micro-main-utils';
import React from 'react';

import type { MenuDataItem } from '@ant-design/pro-components';
import type { MenuTreeNode } from '@utopia/micro-types';

const menuIconMapping = {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  MacCommandOutlined,
  LinkOutlined
};

// 处理外部链接以及菜单模式为 splitMenus 时，一级菜单重定向
const getIframeSrc = (url) => {
  return isUrl(url)
    ? `${ROUTE_CORE_IFRAME_SRC}/${encodeURIComponent(url)}`
    : url;
};

const getRoutePath = (item: MenuTreeNode) => {
  let routePath = getIframeSrc(item.url);
  if (item.children?.length) {
    routePath = getIframeSrc(item.children[0].url);
  }
  return routePath;
};
function convertMenuData(menuData: MenuTreeNode[]): MenuDataItem[] {
  const convertedMenuData: MenuDataItem[] = menuData.map((item) => {
    return {
      name: item.name,
      path: getRoutePath(item),
      key: getIframeSrc(item.url),
      target: item.openWithNewTarget ? '_blank' : '_self',
      icon: item.icon
        ? React.createElement(menuIconMapping[item.icon] || null)
        : null,
      children: convertMenuData(item.children ?? [])
    };
  });
  return convertedMenuData;
}

export { convertMenuData };
