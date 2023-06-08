import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useHoverStyle, useSiteToken } from '@utopia/micro-main-utils';
import React from 'react';

const MenuCollapsedButton: React.FC<{
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}> = (props) => {
  const { collapsed, onCollapse } = props;
  const {
    token: { colorPrimary }
  } = useSiteToken();
  useHoverStyle('#menu-collapse-icon', {}, { color: colorPrimary });
  return (
    <div onClick={() => onCollapse(!collapsed)} id="menu-collapse-icon">
      {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
    </div>
  );
};

export default MenuCollapsedButton;
