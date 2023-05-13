import { useModel } from '@umijs/max';
import Styles from './index.less';
import ApiLoadingStatus from './network-status';
import UserInfoContent from './user-info-content';

const HeaderRightContent = () => {
  const { initialState } = useModel('@@initialState');
  return (
    <div className={Styles['header-right-content-wrap']}>
      <UserInfoContent initialState={initialState} />
      <ApiLoadingStatus />
    </div>
  );
};

export default HeaderRightContent;
