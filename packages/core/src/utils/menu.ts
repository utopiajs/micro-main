// 将 menuData 转为 菜单侧边栏数据
import {
  MacCommandOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import React from 'react';

import type { MenuDataItem } from '@ant-design/pro-components';
import type { MenuTreeNode } from '@utopia/micro-types';

const menuIconMapping = {
  SettingOutlined,
  UserOutlined,
  MacCommandOutlined
};
function convertMenuData(menuData: MenuTreeNode[]): MenuDataItem[] {
  const convertedMenuData: MenuDataItem[] = menuData.map((item) => {
    return {
      name: item.name,
      path: item.url,
      icon: item.icon
        ? React.createElement(menuIconMapping[item.icon] || null)
        : null,
      children: convertMenuData(item.children ?? [])
    };
  });
  return convertedMenuData;
}

export { convertMenuData };
