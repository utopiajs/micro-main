// 不做左右联动

import { COMPONENT_CLASSNAME_PREFIX } from '@/constants/component';
import { coreMenuApi } from '@/services';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  cloneDeep,
  convertArrayFromTree,
  isApiSuccess,
  renderDefaultField,
  useHoverStyle,
  useSiteToken
} from '@utopia/micro-main-utils';
import type { Menu, MenuTreeNode } from '@utopia/micro-types';
import { Button, Checkbox } from 'antd';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import { CoreTree } from '@utopia/core-component';

import './index.less';

export interface RefMenuTransferBaseProps {
  targetList: Menu[];
}
interface DataNode extends MenuTreeNode {
  key: number | string;
  children?: DataNode[];
}

interface TargetMenu extends Menu {
  checked?: boolean;
}
export interface MenuTransferBaseProps {
  defaultValue?: Menu[];
}

const prefixCls = `${COMPONENT_CLASSNAME_PREFIX}-menu-transfer`;

const MenuTransferBase = forwardRef<
  RefMenuTransferBaseProps,
  MenuTransferBaseProps
>((props, ref) => {
  const { defaultValue = [] } = props;
  const defaultCheckedKeys = defaultValue.map((item) => item.id);

  const [menuTreeData, setMenuTreeData] = useState<DataNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]); // 主要用户搜索
  const [checkedKeys, setCheckedKeys] = useState<string[]>(defaultCheckedKeys);
  const [checkedNodes, setCheckedNodes] = useState<Menu[]>(defaultValue);
  const [targetList, setTargetList] = useState<TargetMenu[]>(defaultValue); // 右侧列表数据
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

  useImperativeHandle(ref, () => {
    return {
      targetList
    };
  });

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

  const handleMenuSearch = useCallback(
    (value) => {
      menuTreeSearchValueRef.current.search = value;
      getMenuTreeData();
    },
    [getMenuTreeData]
  );

  const addTargetList = useCallback(() => {
    setTargetList(checkedNodes);
  }, [checkedNodes]);

  // remove
  const removeTargetList = useCallback(() => {
    const nextTargetList = targetList.filter((item) => !item.checked);
    setTargetList(nextTargetList);
  }, [targetList]);

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

  const getCheckboxValue = useCallback((_checkedkeys, allList) => {
    const checkedLength = _checkedkeys.length;
    const allListLength = allList.length;
    return {
      indeterminate: checkedLength > 0 && checkedLength !== allListLength,
      checked: checkedLength === allListLength && allListLength !== 0,
      disabled: allListLength === 0
    };
  }, []);

  const getMenuTreeSelectedText = useCallback((_checkedKeys, allList) => {
    const checkedLength = _checkedKeys.length;
    const allListLength = allList.length;
    return `${checkedLength ? `${checkedLength}/` : ''}${allListLength} 项`;
  }, []);

  // 右侧列表点击
  const handleTargetItemCheck = useCallback(
    (e, item) => {
      const { id } = item;
      const nextTargetList = targetList.map((_item) => {
        if (_item.id === id) {
          _item.checked = e.target.checked;
        }
        return _item;
      });

      setTargetList(nextTargetList);
    },
    [targetList]
  );

  // target check all
  const menuTargetCheckAll = useCallback(
    (e) => {
      const nextTargetList = targetList.map((_item) => {
        return {
          ..._item,
          checked: e.target.checked
        };
      });
      setTargetList(nextTargetList);
    },
    [targetList]
  );

  useEffect(() => {
    getMenuTreeData();
  }, [getMenuTreeData]);

  const targetCheckedList = targetList
    .filter((item) => item.checked)
    .map((item) => item.id);
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
              {...getCheckboxValue(checkedKeys, menuListRef.current)}
              onChange={menuTreeCheckAll}
            />
            <span className={`${prefixCls}-list-heade-selected`}>
              {getMenuTreeSelectedText(checkedKeys, menuListRef.current)}
            </span>
          </div>
          <div className={`${prefixCls}-list-body`}>
            <CoreTree
              placeholder="请输入菜单名称"
              checkable
              checkedKeys={checkedKeys}
              treeData={menuTreeData}
              expandedKeys={expandedKeys}
              searchValue={menuTreeSearchValueRef.current.search}
              onSearch={handleMenuSearch}
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
            disabled={checkedKeys.length === 0}
            icon={<RightOutlined />}
            style={{ marginBottom: `${marginXXS}px` }}
            onClick={addTargetList}
          />
          <Button
            danger
            size="small"
            icon={<LeftOutlined />}
            disabled={targetCheckedList.length === 0}
            onClick={removeTargetList}
          />
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
            <Checkbox
              style={{ marginInlineEnd: `${marginXS}px` }}
              onChange={menuTargetCheckAll}
              {...getCheckboxValue(targetCheckedList, targetList)}
            />
            <span className={`${prefixCls}-list-heade-selected`}>
              {getMenuTreeSelectedText(targetCheckedList, targetList)}
            </span>
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
                <Checkbox
                  style={{ marginInlineEnd: `${marginXS}px` }}
                  onChange={menuTargetCheckAll}
                  {...getCheckboxValue(targetCheckedList, targetList)}
                />
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
                      checked={item.checked}
                      onChange={(e) => {
                        handleTargetItemCheck.apply(null, [e, item]);
                      }}
                    />
                    <div
                      className={`${prefixCls}-selected-list-body-item-title`}
                    >
                      {item.name}
                    </div>
                    <div
                      className={`${prefixCls}-selected-list-body-item-title`}
                    >
                      {renderDefaultField(item.parentName)}
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
