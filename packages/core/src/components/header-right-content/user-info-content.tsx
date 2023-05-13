import { useSiteToken } from '@utopia/micro-main-utils';
import { type IInitialState } from '@utopia/micro-types';
import { Avatar } from 'antd';
import Styles from './index.less';

interface IProps {
  initialState?: IInitialState;
}

const UserInfoContent = (props: IProps) => {
  const { initialState } = props;
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
          {initialState?.currentUser.name}
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
