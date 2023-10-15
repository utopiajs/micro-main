// 基于 antd Tree 分装，增加一些特有操作以及布局
import { useSiteToken } from '@utopia/micro-main-utils';
import type { TreeProps } from 'antd';
import { Input, Tree } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import React, { useCallback } from 'react';
import { COMPONENT_CLASSNAME_PREFIX } from '../../constants/component';

import './index.less';

interface CoreTreeProps extends TreeProps {
  placeholder?: string;
  searchValue?: string;
  onSearch?: SearchProps['onSearch'];
  headerRender?: () => React.ReactNode;
}
const prefixCls = `${COMPONENT_CLASSNAME_PREFIX}-core-tree`;

const CoreTree: React.FC<CoreTreeProps> = (props) => {
  const {
    placeholder,
    selectedKeys,
    searchValue,
    headerRender,
    onSearch,
    titleRender,
    fieldNames,
    ...restProps
  } = props;
  const {
    token: { paddingXXS, marginXS, colorErrorText }
  } = useSiteToken();

  // 处理搜索高亮
  const treeNodeRender = useCallback(
    (nodeData) => {
      if (titleRender) {
        return titleRender(nodeData);
      }
      if (searchValue) {
        const rawString = nodeData.name ?? '';
        const searchTitleHighlightStr = rawString
          .split(searchValue)
          .join(`<span style="color:${colorErrorText}">${searchValue}</span>`);

        return (
          <span dangerouslySetInnerHTML={{ __html: searchTitleHighlightStr }} />
        );
      }

      return nodeData[fieldNames?.title ?? 'name'];
    },
    [titleRender, searchValue, colorErrorText, fieldNames]
  );

  return (
    <div className={`${prefixCls}`} style={{ padding: paddingXXS }}>
      {headerRender && (
        <div className={`${prefixCls}-header-content`}>{headerRender()}</div>
      )}
      <div
        className={`${prefixCls}-search`}
        style={{ marginBlockStart: marginXS, marginBlockEnd: marginXS }}
      >
        <Input.Search
          placeholder={placeholder}
          onSearch={onSearch}
          allowClear
        />
      </div>
      <div className={`${prefixCls}-body`}>
        <Tree
          selectedKeys={selectedKeys}
          blockNode
          titleRender={treeNodeRender}
          fieldNames={fieldNames}
          {...restProps}
        />
      </div>
    </div>
  );
};

export default CoreTree;
