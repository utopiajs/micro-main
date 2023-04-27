import Styles from './index.less';
import UserInfoContent from './user-info-content';

const HeaderRightContent = () => {
  return (
    <div className={Styles['header-right-content-wrap']}>
      <UserInfoContent />
    </div>
  );
};

export default HeaderRightContent;
