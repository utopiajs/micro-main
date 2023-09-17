// 适用于 table 的 ellipsis 区域内容
import { Tooltip } from 'antd';
import React from 'react';
import { COMPONENT_CLASSNAME_PREFIX } from '../../constants/component';

const prefixCls = `${COMPONENT_CLASSNAME_PREFIX}-core-table-ellipsis-content`;

const EllipsisContent: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <Tooltip title={children}>
      <div className={prefixCls}>{children}</div>
    </Tooltip>
  );
};

export default EllipsisContent;
