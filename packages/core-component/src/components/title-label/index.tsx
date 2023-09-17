import { useSiteToken } from '@utopia/micro-main-utils';
import { Typography } from 'antd';
import type { TitleProps } from 'antd/es/typography/Title';
import React from 'react';
import { COMPONENT_CLASSNAME_PREFIX } from '../../constants/component';

import './index.less';

const prefixCls = COMPONENT_CLASSNAME_PREFIX;

const TitleLabel: React.FC<React.PropsWithChildren<TitleProps>> = (props) => {
  const { children, ...restProps } = props;
  const {
    token: { colorPrimary }
  } = useSiteToken();

  return (
    <div
      className={`${prefixCls}-title-label`}
      style={{ borderColor: colorPrimary }}
    >
      <Typography.Title {...restProps} style={{ marginBottom: 0 }}>
        {children}
      </Typography.Title>
    </div>
  );
};

export default TitleLabel;
