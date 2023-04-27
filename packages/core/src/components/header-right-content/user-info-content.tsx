import { useSiteToken } from '@utopia/micro-main-utils';
import { Avatar } from 'antd';
import Styles from './index.less';

const UserInfoContent = () => {
  const {
    token: { fontSizeSM, colorText, colorTextTertiary }
  } = useSiteToken();
  return (
    <div
      style={{ fontSize: fontSizeSM }}
      className={Styles['user-info-content-wrap']}
    >
      <div className="user-base-info">
        <div style={{ color: colorText }} className="user-name">
          KuangPF
        </div>
        <div style={{ color: colorTextTertiary }}>主账号</div>
      </div>
      <div className="user-avatar">
        <Avatar
          shape="circle"
          src="https://avatars.githubusercontent.com/u/20694238?s=40&v=4"
        >
          U
        </Avatar>
      </div>
    </div>
  );
};

export default UserInfoContent;
