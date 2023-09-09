// 将 menuData 转为 菜单侧边栏数据
import type { MenuDataItem } from '@ant-design/pro-components';
import type { MenuTreeNode } from '@utopia/micro-types';

function convertMenuData(menuData: MenuTreeNode[]): MenuDataItem[] {
  const convertedMenuData: MenuDataItem[] = menuData.map((item) => {
    return {
      name: item.name,
      path: item.url,
      children: convertMenuData(item.children ?? [])
    };
  });
  return convertedMenuData;
}

export { convertMenuData };
