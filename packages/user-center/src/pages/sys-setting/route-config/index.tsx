// route config
import { CoreTree } from '@/components';
import { formItemEditLayout, formTailLayout } from '@/constants';
import { coreMenuApi } from '@/services';
import { ExclamationCircleOutlined, WarningOutlined } from '@ant-design/icons';
import {
  cloneDeep,
  convertArrayFromTree,
  isApiSuccess,
  removeEmptyFields,
  useSiteToken
} from '@utopia/micro-main-utils';
import type { Menu, MenuTreeNode } from '@utopia/micro-types';
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Space,
  Switch,
  Typography
} from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { handleSortDragMenu } from './utils';

import Styles from './index.less';

export interface DataNode extends MenuTreeNode {
  key: number | string;
  children?: DataNode[];
}
type TOperateStatus = 'edit' | 'add' | '';

const menuDefalutValue: Partial<Menu> = {
  name: '',
  url: '',
  code: '',
  showHeader: true,
  showSidebar: true
};

const RouteConfig: React.FC = () => {
  const [menuTreeData, setMenuTreeData] = useState<DataNode[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]); // 主要用户搜索
  const [currentEditMenu, setCurrentEditMenu] = useState<Menu>(
    menuDefalutValue as Menu
  );
  const [showEditFormPanel, setShowEditFormPanel] = useState(false);
  const [menuDraggable, setMenuDraggable] = useState<boolean>(false);
  const [messageAPI, contextHolder] = message.useMessage();
  const [menuEditForm] = Form.useForm();
  const [modalAPI, modalContextHolder] = Modal.useModal();
  const operateStatusRef = useRef<TOperateStatus>('');
  const menuTreeSearchValueRef = useRef<{ search: string }>({ search: '' });

  const {
    token: {
      paddingXS,
      colorBorderSecondary,
      margin,
      colorText,
      paddingSM,
      marginXXL,
      fontSizeSM,
      marginXS
    }
  } = useSiteToken();

  const getMenuTreeData = useCallback(async () => {
    const { errorCode, data } = await coreMenuApi.menuTreeWithGet(
      menuTreeSearchValueRef.current
    );
    if (isApiSuccess(errorCode)) {
      if (menuTreeSearchValueRef.current.search) {
        const searchExpandedKeys = convertArrayFromTree(
          cloneDeep(data) as unknown as DataNode[],
          []
        ).map((item) => item.id);
        setExpandedKeys(searchExpandedKeys);
      } else {
        setExpandedKeys([]);
      }
      setMenuTreeData(data as unknown as DataNode[]);
    }
  }, []);

  const handleTreeSelect = useCallback((treeSelectedKeys, { node }) => {
    delete node.children;
    operateStatusRef.current = 'edit';
    setSelectedKeys(treeSelectedKeys);
    setCurrentEditMenu(node);
  }, []);

  // 处理菜单数据
  const handleMenuFormFinish = useCallback(
    async (values: Menu) => {
      const { id, level } = currentEditMenu;
      // 没有 id，新建，否则修改, id -1 hack 菜单新建情况
      if (id && operateStatusRef.current !== 'add') {
        const { errorCode } = await coreMenuApi.menuUpdateWithPost({
          ...values,
          id
        });
        if (isApiSuccess(errorCode)) {
          messageAPI.success('菜单修改成功');
          getMenuTreeData(); // 全量更新
        }
      } else {
        if (id !== '-1') {
          // 二级菜单
          values.parentId = id;
        }
        const _level = level ? level + 1 : 1;
        values.level = _level as 1 | 2 | 3;
        const { errorCode, data } = await coreMenuApi.menuCreateWithPost(
          removeEmptyFields(values)
        );
        if (isApiSuccess(errorCode)) {
          messageAPI.success('菜单新增成功');
          operateStatusRef.current = 'edit';
          setSelectedKeys([data.id]);
          setCurrentEditMenu(data);
          getMenuTreeData(); // 全量更新
        }
      }
    },
    [messageAPI, currentEditMenu, getMenuTreeData]
  );

  // reset
  const handleMenuFormReset = useCallback(() => {
    menuEditForm.setFieldsValue(currentEditMenu);
  }, [menuEditForm, currentEditMenu]);

  const handleAdd = useCallback(() => {
    operateStatusRef.current = 'add';
    setCurrentEditMenu({
      ...menuDefalutValue,
      id: currentEditMenu.id
    } as Menu);
  }, [currentEditMenu]);

  // delete tree
  const handleTreeDelete = useCallback(async () => {
    modalAPI.confirm({
      title: '确定删除所选菜单以及子节点？该操作不可逆！',
      onOk: async () => {
        const { errorCode } = await coreMenuApi.menuDeleteWithDelete({
          id: currentEditMenu.id
        });
        if (isApiSuccess(errorCode)) {
          messageAPI.success('菜单删除成功');
          operateStatusRef.current = '';
          setCurrentEditMenu(menuDefalutValue as Menu);
          getMenuTreeData();
        }
      }
    });
  }, [currentEditMenu, messageAPI, modalAPI, getMenuTreeData]);

  // header render
  const menuTreeHeaderRender = useCallback(() => {
    return (
      <div style={{ color: colorText }}>
        <span style={{ fontSize: fontSizeSM, marginInlineEnd: marginXS }}>
          调整菜单顺序
        </span>
        <Switch
          size="small"
          checked={menuDraggable}
          onChange={(checked) => setMenuDraggable(checked)}
        />
      </div>
    );
  }, [marginXS, fontSizeSM, menuDraggable, colorText]);

  // 菜单拖动
  const handleMenuDrap = useCallback(
    (info) => {
      const { sortedMenuTreeData, movedInfo } = handleSortDragMenu(
        info,
        menuTreeData
      );
      coreMenuApi.menuNodeMoveWithPost(movedInfo);
      setMenuTreeData(sortedMenuTreeData);
      return true;
    },
    [menuTreeData]
  );

  // 搜索菜单树
  const handleMenuSearch = useCallback(
    (value) => {
      menuTreeSearchValueRef.current.search = value;
      getMenuTreeData();
    },
    [getMenuTreeData]
  );

  const handleMenuExpand = useCallback((_expandedKeys) => {
    setExpandedKeys(_expandedKeys);
  }, []);

  useEffect(() => {
    getMenuTreeData();
  }, [getMenuTreeData]);

  useEffect(() => {
    setShowEditFormPanel(
      Boolean(currentEditMenu.id) || operateStatusRef.current === 'add'
    );
    menuEditForm.setFieldsValue(currentEditMenu);
  }, [currentEditMenu, menuEditForm]);

  return (
    <div className={Styles['route-config-page']} style={{ padding: paddingXS }}>
      <div
        className="route-config-content-left"
        style={{ borderColor: colorBorderSecondary, marginRight: margin }}
      >
        <CoreTree
          placeholder="请输入菜单名称"
          draggable={menuDraggable}
          treeData={menuTreeData}
          selectedKeys={selectedKeys}
          expandedKeys={expandedKeys}
          searchValue={menuTreeSearchValueRef.current.search}
          onExpand={handleMenuExpand}
          onSelect={handleTreeSelect}
          headerRender={menuTreeHeaderRender}
          onDrop={handleMenuDrap}
          onSearch={handleMenuSearch}
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
            borderBottomColor: colorBorderSecondary
          }}
        >
          {currentEditMenu.name ||
            (operateStatusRef.current === 'add' ? '新建菜单' : '路由配置')}
        </div>
        <div className="menu-form-content" style={{ paddingTop: marginXXL }}>
          <Form
            {...formItemEditLayout}
            form={menuEditForm}
            onFinish={handleMenuFormFinish}
            style={{ display: `${showEditFormPanel ? 'block' : 'none'}` }}
          >
            <Form.Item
              label="菜单名称"
              name="name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="路由地址" name="url" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="菜单编码" name="code">
              <Input />
            </Form.Item>
            <Form.Item label="导航图标" name="icon">
              <Input />
            </Form.Item>
            <Form.Item
              label="展示头部"
              name="showHeader"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label="展示侧边栏"
              name="showSidebar"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item {...formTailLayout}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button
                onClick={handleMenuFormReset}
                style={{ marginInline: marginXS }}
              >
                重置
              </Button>
              {currentEditMenu.id && operateStatusRef.current !== 'add' && (
                <React.Fragment>
                  <Button
                    onClick={handleAdd}
                    style={{ marginInline: marginXS }}
                  >
                    新建子菜单
                  </Button>
                  <Button danger onClick={handleTreeDelete}>
                    删除菜单
                  </Button>
                </React.Fragment>
              )}
            </Form.Item>
          </Form>

          <div
            style={{
              padding: paddingSM,
              display: `${!showEditFormPanel ? 'block' : 'none'}`
            }}
          >
            <Space direction="vertical">
              <Typography.Text type="secondary">
                <ExclamationCircleOutlined />
                <span> 菜单配置建议不超过三个层级</span>
              </Typography.Text>
              <Typography.Text type="secondary">
                <WarningOutlined />
                <span> 选中菜单节点删除时，所选菜单以及子菜单均会被删除</span>
              </Typography.Text>
            </Space>
            <Space.Compact block>
              <Button
                type="primary"
                onClick={handleAdd}
                style={{ marginBlockStart: margin }}
              >
                新建菜单
              </Button>
            </Space.Compact>
          </div>
        </div>
      </div>
      {contextHolder}
      {modalContextHolder}
    </div>
  );
};

export default RouteConfig;
