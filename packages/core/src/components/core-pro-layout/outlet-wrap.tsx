import { useSiteToken } from '@utopia/micro-main-utils';
import React from 'react';

const OutletWrap: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const {
    token: { colorBgLayout, colorBgElevated, borderRadius }
  } = useSiteToken();
  return (
    <div
      style={{ backgroundColor: colorBgLayout }}
      className="micro-main-core-outlet-wrap"
    >
      <div
        className="micro-main-core-outlet-wrap-children"
        style={{ backgroundColor: colorBgElevated, borderRadius }}
      >
        {children}
      </div>
    </div>
  );
};

export default OutletWrap;
