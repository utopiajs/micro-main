import { useLocation } from '@umijs/max';
import {
  ROUTE_LOGIN_PATH,
  ROUTE_REGISTER_PATH
} from '@utopia/micro-main-utils';
import { Spin } from 'antd';
import { useCallback } from 'react';
import Styles from './index.less';

const MicroAppLoading = (loading) => {
  const { pathname } = useLocation();
  const showLoadingComponent = useCallback(() => {
    return (
      ![ROUTE_LOGIN_PATH, ROUTE_REGISTER_PATH].includes(pathname) && loading
    );
  }, [pathname, loading]);

  return showLoadingComponent() ? (
    <div className={Styles['micro-app-loading-wrap']}>
      <Spin tip="应用加载中..." spinning>
        <div className="content" />
      </Spin>
    </div>
  ) : null;
};

export default MicroAppLoading;
