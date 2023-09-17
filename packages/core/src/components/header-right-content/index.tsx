import { useModel } from '@umijs/max';
import Styles from './index.less';
import ApiLoadingStatus from './network-status';
import UserInfoContent from './user-info-content';
import ClientInfo from './client-info';

const HeaderRightContent = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <div className={Styles['header-right-content-wrap']}>
      <ClientInfo />
      <UserInfoContent initialState={initialState} />
      <ApiLoadingStatus />
    </div>
  );
};

export default HeaderRightContent;
