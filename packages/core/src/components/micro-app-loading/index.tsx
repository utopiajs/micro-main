import { Spin } from 'antd';
import Styles from './index.less';

const MicroAppLoading = (loading) => {
  return loading ? (
    <div className={Styles['micro-app-loading-wrap']}>
      <Spin tip="应用加载中..." spinning>
        <div className="content" />
      </Spin>
    </div>
  ) : null;
};

export default MicroAppLoading;
