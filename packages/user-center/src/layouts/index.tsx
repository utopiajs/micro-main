import { ConfigProvider, theme } from 'antd';
import { Outlet } from '@umijs/max';
import styles from './index.less';

export default function Layout() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm
      }}
    >
      <div className={styles['user-center-main-content']}>
        <Outlet />
      </div>
    </ConfigProvider>
  );
}
