// 不做左右联动

import { COMPONENT_CLASSNAME_PREFIX } from '@/constants/component';
import { coreMenuApi } from '@/services';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  cloneDeep,
  convertArrayFromTree,
  isApiSuccess,
  useHoverStyle,
  useSiteToken
} from '@utopia/micro-main-utils';
import type { Menu, MenuTreeNode } from '@utopia/micro-types';
import { Button, Checkbox } from 'antd';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import CoreTree from '../core-tree';

import './index.less';

export interface RefMenuTransferBaseProps {
  menuSelectRows: string[];
}
interface DataNode extends MenuTreeNode {
  key: number | string;
  children?: DataNode[];
}

export interface MenuTransferBaseProps {}

const prefixCls = `${COMPONENT_CLASSNAME_PREFIX}-menu-transfer`;

const MenuTransferBase = forwardRef<
  RefMenuTransferBaseProps,
  MenuTransferBaseProps
>((props, ref) => {
  const [menuTreeData, setMenuTreeData] = useState<DataNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]); // 主要用户搜索
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [checkedNodes, setCheckedNodes] = useState<Menu[]>([]);
  const [targetList, setTargetList] = useState<Menu[]>([]); // 右侧列表数据
  const [targetCheckedList, setTargetCheckedList] = useState<string[]>([]);
  const menuTreeSearchValueRef = useRef<{ search: string }>({ search: '' });
  const menuListRef = useRef<Menu[]>([]);

  const {
    token: {
      colorBorder,
      paddingSM,
      paddingXS,
      marginXS,
      marginXXS,
      colorBorderSecondary,
      colorBgTextHover,
      colorFillAlter
    }
  } = useSiteToken();

  useHoverStyle(
    `.${prefixCls}-selected-list-body-item`,
    {},
    { backgroundColor: colorFillAlter }
  );

  const getMenuTreeData = useCallback(async () => {
    const { errorCode, data } = await coreMenuApi.menuTreeWithGet(
      menuTreeSearchValueRef.current
    );
    if (isApiSuccess(errorCode)) {
      const menuList = convertArrayFromTree(
        cloneDeep(data) as unknown as DataNode[],
        []
      );
      if (menuTreeSearchValueRef.current.search) {
        const searchExpandedKeys = menuList.map((item) => item.id);
        setExpandedKeys(searchExpandedKeys);
      } else {
        setExpandedKeys([]);
      }
      menuListRef.current = menuList;
      setMenuTreeData(data as unknown as DataNode[]);
    }
  }, []);

  const handleMenuExpand = useCallback((_expandedKeys) => {
    setExpandedKeys(_expandedKeys);
  }, []);

  const handleMenuTreeCheck = useCallback(
    (_checkedKeys, { checkedNodes: _checkedNodes }) => {
      setCheckedKeys(_checkedKeys);
      setCheckedNodes(_checkedNodes);
    },
    []
  );

  const addTargetList = useCallback(() => {
    setTargetList(checkedNodes);
  }, [checkedNodes]);

  // 处理 menuTree 全选操作
  const menuTreeCheckAll = useCallback((e) => {
    if (e.target.checked) {
      setCheckedNodes(menuListRef.current);
      setCheckedKeys(menuListRef.current.map((item) => item.id));
    } else {
      setCheckedNodes([]);
      setCheckedKeys([]);
    }
  }, []);

  const getMenuTreeCheckboxValue = useCallback(() => {
    const checkedLength = checkedKeys.length;
    const allMenuListLength = menuListRef.current.length;
    return {
      indeterminate: checkedLength > 0 && checkedLength !== allMenuListLength,
      checked: checkedLength === allMenuListLength,
      disabled: menuListRef.current.length === 0
    };
  }, [checkedKeys]);

  const getTargetListCheckboxValue = useCallback(() => {
    const checkedLength = targetCheckedList.length;
    const targetListLength = targetList.length;
    return {
      indeterminate: checkedLength > 0 && checkedLength !== targetListLength,
      checked: checkedLength === targetListLength,
      disabled: targetList.length === 0
    };
  }, [targetCheckedList, targetList]);

  const getMenuTreeSelectedText = useCallback(() => {
    const checkedLength = checkedKeys.length;
    const allMenuListLength = menuListRef.current.length;
    return `${checkedLength ? `${checkedLength}/` : ''}${allMenuListLength} 项`;
  }, [checkedKeys]);

  useEffect(() => {
    getMenuTreeData();
  }, [getMenuTreeData]);

  return (
    <div className={`${prefixCls}-base-panel`}>
      <div className={`${prefixCls}-base-panel-body`}>
        <div
          className={`${prefixCls}-list`}
          style={{
            borderColor: colorBorder,
            flexBasis: '25%'
          }}
        >
          <div
            className={`${prefixCls}-list-header`}
            style={{
              borderColor: colorBorder,
              padding: `${paddingXS}px ${paddingSM}px`
            }}
          >
            <Checkbox
              style={{ marginInlineEnd: `${marginXS}px` }}
              {...getMenuTreeCheckboxValue()}
              onChange={menuTreeCheckAll}
            />
            <span className={`${prefixCls}-list-heade-selected`}>
              {getMenuTreeSelectedText()}
            </span>
          </div>
          <div className={`${prefixCls}-list-body`}>
            <CoreTree
              placeholder="请输入菜单名称"
              checkable
              checkedKeys={checkedKeys}
              treeData={menuTreeData}
              expandedKeys={expandedKeys}
              onExpand={handleMenuExpand}
              fieldNames={{ title: 'name', key: 'id' }}
              onCheck={handleMenuTreeCheck}
            />
          </div>
        </div>
        <div className={`${prefixCls}-operation`}>
          <Button
            type="primary"
            size="small"
            icon={<RightOutlined />}
            style={{ marginBottom: `${marginXXS}px` }}
            onClick={addTargetList}
          />
          <Button danger size="small" icon={<LeftOutlined />} />
        </div>
        <div
          className={`${prefixCls}-list`}
          style={{
            borderColor: colorBorder
          }}
        >
          <div
            className={`${prefixCls}-list-header`}
            style={{
              borderColor: colorBorder,
              padding: `${paddingXS}px ${paddingSM}px`
            }}
          >
            <Checkbox style={{ marginInlineEnd: `${marginXS}px` }} />
            <span className={`${prefixCls}-list-heade-selected`}>2项</span>
          </div>
          <div className={`${prefixCls}-list-body`}>
            <div className={`${prefixCls}-selected-list-wrap`}>
              <div
                className={`${prefixCls}-selected-list-header`}
                style={{
                  padding: `${paddingXS}px ${paddingSM}px`,
                  backgroundColor: colorBgTextHover
                }}
              >
                <Checkbox style={{ marginInlineEnd: `${marginXS}px` }} />
                <div className={`${prefixCls}-selected-list-header-title`}>
                  模块名称
                </div>
                <div className={`${prefixCls}-selected-list-header-title`}>
                  所属组织
                </div>
              </div>
              <div className={`${prefixCls}-selected-list-body`}>
                {targetList.map((item, index) => (
                  <div
                    className={`${prefixCls}-selected-list-body-item`}
                    style={{
                      borderColor: colorBorderSecondary,
                      paddingInline: `${paddingSM}px`
                    }}
                    key={index}
                  >
                    <Checkbox
                      style={{ marginInlineEnd: `${marginXS}px` }}
                      {...getTargetListCheckboxValue()}
                    />
                    <div
                      className={`${prefixCls}-selected-list-body-item-title`}
                    >
                      {item.name}
                    </div>
                    <div
                      className={`${prefixCls}-selected-list-body-item-title`}
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MenuTransferBase;
