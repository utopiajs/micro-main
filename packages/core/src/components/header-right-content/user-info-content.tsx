import ArrowDownIcon from '@/icons/ArrowDownIcon';
import { coreAuthApi } from '@/services';
import { BgColorsOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import {
  isApiSuccess,
  useHoverStyle,
  useSiteToken,
  _Cookies
} from '@utopia/micro-main-utils';
import { type IInitialState } from '@utopia/micro-types';
import { Avatar } from 'antd';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import Styles from './index.less';

interface IProps {
  initialState?: IInitialState;
}

const UserInfoContent = (props: IProps) => {
  const { initialState } = props;
  const [showDropContent, setShowDropContent] = useState(false);
  const {
    token: {
      fontSizeSM,
      colorText,
      colorTextTertiary,
      colorBorder,
      colorBgContainer,
      colorBgTextHover
    }
  } = useSiteToken();

  useHoverStyle(
    '.operation-item-hover',
    {},
    { backgroundColor: colorBgTextHover }
  );
  const handleShowDropContent = useCallback(() => {
    setShowDropContent(!showDropContent);
  }, [showDropContent]);

  const handleLogout = useCallback(async () => {
    const { errorCode } = await coreAuthApi.authLogoutWithPost({
      refreshToken: _Cookies.get('refresh.token')
    });
    if (isApiSuccess(errorCode)) {
      window.location.reload();
    }
  }, []);
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
      <div className="user-avatar" onClick={handleShowDropContent}>
        <Avatar
          shape="circle"
          src="https://avatars.githubusercontent.com/u/20694238?s=40&v=4"
        >
          U
        </Avatar>
        <div
          className={classNames([
            'drop-content-arrow',
            { 'drop-content-arrow-active': showDropContent }
          ])}
        >
          <ArrowDownIcon />
        </div>
      </div>
      {showDropContent && (
        <div
          className="drop-content-panel"
          style={{
            borderColor: colorBorder,
            backgroundColor: colorBgContainer,
            borderTopColor: colorBgContainer
          }}
        >
          <ul>
            <Link to="/user-center/preference-setting">
              <li
                className="operation-item operation-item-hover"
                style={{ color: colorText }}
              >
                <BgColorsOutlined />
                <span>主题设置</span>
              </li>
            </Link>
            <li
              className="operation-item operation-item-hover"
              onClick={handleLogout}
            >
              <LogoutOutlined />
              <span>退出登陆</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserInfoContent;
