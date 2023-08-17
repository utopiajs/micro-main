// route config
import { CoreTree } from '@/components';
import { formItemEditLayout, formTailLayout } from '@/constants';
import { coreMenuApi } from '@/services';
import { isApiSuccess, useSiteToken } from '@utopia/micro-main-utils';
import type { MenuTreeNode } from '@utopia/micro-types';
import { Button, Form, Input, Switch } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Styles from './index.less';

interface DataNode extends MenuTreeNode {
  key: number | string;
}
const RouteConfig: React.FC = () => {
  const [menuTreeData, setMenuTreeData] = useState<DataNode[]>([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [currentEditMenu, setCurrentEditMenu] = useState({});
  const menuEditRef = useRef(null);
  const {
    token: {
      paddingXS,
      colorBorderSecondary,
      margin,
      colorText,
      paddingSM,
      marginXXL,
      marginXS
    }
  } = useSiteToken();

  const getMenuTreeData = useCallback(async () => {
    const { errorCode, data } = await coreMenuApi.menuTreeWithGet();
    if (isApiSuccess(errorCode)) {
      setMenuTreeData(data as unknown as DataNode[]);
    }
  }, []);

  const handleTreeSelect = useCallback(
    (treeSelectedKeys, { selectedNodes }) => {
      setSelectedKeys(treeSelectedKeys);
      setCurrentEditMenu(selectedNodes);
    },
    []
  );

  useEffect(() => {
    getMenuTreeData();
  }, [getMenuTreeData]);

  return (
    <div className={Styles['route-config-page']} style={{ padding: paddingXS }}>
      <div
        className="route-config-content-left"
        style={{ borderColor: colorBorderSecondary, marginRight: margin }}
      >
        <CoreTree
          placeholder="请输入菜单名称"
          treeData={menuTreeData}
          selectedKeys={selectedKeys}
          onSelect={handleTreeSelect}
          fieldNames={{ title: 'name', key: 'id' }}
        />
      </div>
      <div
        className="route-config-content-right"
        style={{ borderColor: colorBorderSecondary, color: colorText }}
      >
        <div
          className="menu-header-title"
          style={{
            padding: paddingSM,
            marginBottom: marginXXL,
            borderBottomColor: colorBorderSecondary
          }}
        >
          系统设置
        </div>
        <div className="menu-form-content">
          <Form {...formItemEditLayout} ref={menuEditRef}>
            <Form.Item label="菜单名称">
              <Input />
            </Form.Item>
            <Form.Item label="路由地址">
              <Input />
            </Form.Item>
            <Form.Item label="菜单编码">
              <Input />
            </Form.Item>
            <Form.Item label="展示头部">
              <Switch />
            </Form.Item>
            <Form.Item label="展示侧边栏">
              <Switch />
            </Form.Item>
            <Form.Item {...formTailLayout}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: marginXS }}
              >
                保存
              </Button>
              <Button>重置</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RouteConfig;
