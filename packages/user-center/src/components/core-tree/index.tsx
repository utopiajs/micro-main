// 基于 antd Tree 分装，增加一些特有操作以及布局
import { COMPONENT_CLASSNAME_PREFIX } from '@/constants/component';
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined
} from '@ant-design/icons';
import { useSiteToken } from '@utopia/micro-main-utils';
import type { TreeProps } from 'antd';
import { Input, Tree } from 'antd';
import classNames from 'classnames';
import React from 'react';

import './index.less';

interface CoreTreeProps extends TreeProps {
  placeholder?: string;
}

const prefixCls = COMPONENT_CLASSNAME_PREFIX;

const CoreTree: React.FC<CoreTreeProps> = (props) => {
  const { placeholder, selectedKeys, ...restProps } = props;
  const {
    token: { paddingXXS, marginXS, colorTextDisabled, colorText }
  } = useSiteToken();
  const operateDisabled = !selectedKeys?.length;
  return (
    <div className={`${prefixCls}-core-tree`} style={{ padding: paddingXXS }}>
      <div
        className={`${prefixCls}-core-tree-header-operation`}
        style={{ color: colorText }}
      >
        <div className={classNames(['header-operation-item'])}>
          <FileAddOutlined />
        </div>
        <div
          className={classNames([
            'header-operation-item',
            { 'header-operation-item-disabled': operateDisabled }
          ])}
          style={{
            color: `${operateDisabled ? colorTextDisabled : colorText}`
          }}
        >
          <EditOutlined />
        </div>
        <div
          className={classNames([
            'header-operation-item',
            { 'header-operation-item-disabled': operateDisabled }
          ])}
          style={{
            color: `${operateDisabled ? colorTextDisabled : colorText}`
          }}
        >
          <DeleteOutlined />
        </div>
      </div>
      <div
        className={`${prefixCls}-core-tree-search`}
        style={{ marginBlockStart: marginXS, marginBlockEnd: marginXS }}
      >
        <Input.Search placeholder={placeholder} />
      </div>
      <div className={`${prefixCls}-core-tree-body`}>
        <Tree selectedKeys={selectedKeys} blockNode {...restProps} />
      </div>
    </div>
  );
};

export default CoreTree;
