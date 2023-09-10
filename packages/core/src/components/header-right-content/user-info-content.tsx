import ArrowDownIcon from '@/icons/ArrowDownIcon';
import { coreAuthApi } from '@/services';
import {
  BarsOutlined,
  IdcardOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Link } from '@umijs/max';
import {
  isApiSuccess,
  useHoverStyle,
  useSiteToken,
  _Cookies
} from '@utopia/micro-main-utils';
import type { IInitialState } from '@utopia/micro-types';
import { Avatar, Button, Typography } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
      colorBgTextHover,
      controlItemBgHover,
      colorPrimary
    }
  } = useSiteToken();
  const showDropContentRef = useRef(false);
  useHoverStyle(
    '.operation-item-hover,.user-avatar-hover',
    {},
    { backgroundColor: colorBgTextHover }
  );

  const handleShowDropContent = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setShowDropContent(!showDropContent);
      showDropContentRef.current = !showDropContent;
    },
    [showDropContent]
  );

  const handleLogout = useCallback(async () => {
    const { errorCode } = await coreAuthApi.authLogoutWithPost({
      refreshToken: _Cookies.get('refresh.token')
    });
    if (isApiSuccess(errorCode)) {
      window.location.reload();
    }
  }, []);

  const handleDocumentClick = useCallback(() => {
    if (showDropContentRef.current) {
      setShowDropContent(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.addEventListener('click', handleDocumentClick);
    };
  }, [handleDocumentClick]);

  return (
    <div
      style={{ fontSize: fontSizeSM }}
      className={Styles['user-info-content-wrap']}
    >
      <div
        className="header-right-split"
        style={{ backgroundColor: colorBorder }}
      />
      <div className="user-base-info">
        <div style={{ color: colorText }} className="user-name">
          {initialState?.currentUser.name}
        </div>
        <div style={{ color: colorTextTertiary }}>主账号</div>
      </div>
      <div
        className="user-avatar user-avatar-hover"
        onClick={handleShowDropContent}
      >
        <Avatar shape="circle" src={initialState?.currentUser.avatar}>
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

      <div
        className="drop-content-panel"
        style={{
          display: `${showDropContent ? 'block' : 'none'}`,
          borderColor: colorBorder,
          backgroundColor: colorBgContainer,
          borderTopColor: colorBgContainer
        }}
      >
        <div
          className="account-info"
          style={{
            backgroundColor: controlItemBgHover
          }}
        >
          <div className="account-info-left">
            <Avatar
              shape="circle"
              size={40}
              src={initialState?.currentUser.avatar}
            >
              U
            </Avatar>
          </div>
          <div className="account-info-right">
            <div className="account-info-item">
              <span style={{ color: colorTextTertiary }}>账号 ID: </span>
              <Typography.Paragraph
                style={{ display: 'inline-block', marginBottom: 0 }}
                copyable={{
                  text: initialState?.currentUser.id,
                  tooltips: false
                }}
              >
                {initialState?.currentUser.id}
              </Typography.Paragraph>
            </div>
            <div className="account-info-item">
              <div
                className="account-info-tag"
                style={{
                  borderColor: colorPrimary,
                  color: colorPrimary
                }}
              >
                主账号
              </div>
            </div>
          </div>
        </div>
        <ul>
          <Link to="/user-center/base-info">
            <li
              className="operation-item operation-item-hover"
              style={{ color: colorText }}
            >
              <IdcardOutlined />
              <span>基本信息</span>
            </li>
          </Link>
          <Link to="/user-center/preference-setting">
            <li
              className="operation-item operation-item-hover"
              style={{ color: colorText }}
            >
              <BarsOutlined />
              <span>偏好设置</span>
            </li>
          </Link>
        </ul>
        <div
          className="drop-content-panel-bottom"
          style={{ borderColor: colorBorder }}
        >
          <Button icon={<LogoutOutlined />} block onClick={handleLogout}>
            退出登录
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoContent;
