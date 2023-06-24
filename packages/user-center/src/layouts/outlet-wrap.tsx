import qiankunStateFromMaster from '@/mock/qiankunStateFromMaster';
import { useModel } from '@umijs/max';
import { type IInitialState } from '@utopia/micro-types';
import React from 'react';

import styles from './index.less';

const OutletWrap: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const { initialState }: { initialState: IInitialState } =
    useModel('@@qiankunStateFromMaster') || qiankunStateFromMaster;
  return (
    <div
      className={styles['user-center-main-content']}
      style={{ padding: `${initialState.currentUser.id ? '15px' : ''}` }}
    >
      {children}
    </div>
  );
};

export default OutletWrap;
