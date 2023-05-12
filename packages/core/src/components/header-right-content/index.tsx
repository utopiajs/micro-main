import Styles from './index.less';
import ApiLoadingStatus from './network-status';
import UserInfoContent from './user-info-content';

const HeaderRightContent = () => {
  return (
    <div className={Styles['header-right-content-wrap']}>
      <UserInfoContent />
      <ApiLoadingStatus />
    </div>
  );
};

export default HeaderRightContent;
