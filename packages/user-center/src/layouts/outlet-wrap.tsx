import React from 'react';

import styles from './index.less';

const OutletWrap: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;

  return <div className={styles['user-center-main-content']}>{children}</div>;
};

export default OutletWrap;
