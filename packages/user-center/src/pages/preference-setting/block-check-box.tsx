import { CheckOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

import React, { useEffect, useState } from 'react';

export interface BlockCheckboxProps {
  value?: string;
  onChange?: (key: string) => void;
  list?: {
    title: string;
    key: string;
    url: string;
  }[];
}

const BlockCheckbox: React.FC<BlockCheckboxProps> = ({
  value,
  onChange,
  list
}) => {
  const baseClassName = 'user-center-block-checkbox';
  const [dom, setDom] = useState<JSX.Element[]>([]);
  useEffect(() => {
    const domList = (list || []).map((item) => (
      <div
        key={item.key}
        className={`${baseClassName}-item`}
        onClick={() => onChange && onChange(item.key)}
      >
        <Tooltip title={item.title} key={item.key}>
          <img src={item.url} alt={item.key} />
        </Tooltip>
        <div
          className={`${baseClassName}-selectIcon`}
          style={{
            display: value === item.key ? 'block' : 'none'
          }}
        >
          <CheckOutlined />
        </div>
      </div>
    ));
    setDom(domList);
  }, [value, list, baseClassName, onChange]);
  return (
    <div
      className={baseClassName}
      style={{
        minHeight: 42
      }}
    >
      {dom}
    </div>
  );
};

export default BlockCheckbox;
