import Icon from '@ant-design/icons';
import React from 'react';

const SVGIcon: React.FC = () => (
  <svg viewBox="0 0 1221 1024" fill="currentColor" width="1em" height="1em">
    <path d="M256 298.666667l256 256 256-256 85.333333 85.333333-341.333333 341.333333-341.333333-341.333333z" />
  </svg>
);

const ArrowDownIcon: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = (props) => <Icon component={SVGIcon} {...props} />;

export default ArrowDownIcon;
