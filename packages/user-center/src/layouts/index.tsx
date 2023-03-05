import { Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles['user-center-main-content']}>
      <Outlet />
    </div>
  );
}
