import { TitleLabel } from '@/components';
import qiankunStateFromMaster from '@/mock/qiankunStateFromMaster';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import {
  getToken,
  isApiSuccess,
  useSiteToken,
  _Cookies
} from '@utopia/micro-main-utils';
import type { QiankunStateFromMasterProps } from '@utopia/micro-types';
import { Form, message, Upload } from 'antd';
import React, { useCallback, useState } from 'react';
import Styles from './index.less';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const BaseInfo: React.FC = () => {
  const { qiankunGlobalState }: QiankunStateFromMasterProps =
    useModel('@@qiankunStateFromMaster') || qiankunStateFromMaster;

  const [userInfo, setUserInfo] = useState(qiankunGlobalState.currentUser);
  const [uploadLoading, setUploadLoading] = useState(false);
  const {
    token: {
      colorBgLayout,
      borderRadius,
      colorBorderBg,
      colorBorder,
      fontSizeSM,
      marginXS,
      padding
    }
  } = useSiteToken();

  const handleAvatarUploadChange = useCallback(
    ({ file }) => {
      setUploadLoading(true);
      const { response } = file;
      // 处理上传成功
      if (response) {
        setUploadLoading(false);
        const { errorCode, data, _message } = response;
        if (isApiSuccess(errorCode)) {
          setUserInfo({
            ...userInfo,
            avatar: data.url
          });
        } else {
          message.error(_message);
        }
      }
    },
    [userInfo]
  );

  return (
    <div className={Styles['base-info-wrap']} style={{ padding }}>
      <TitleLabel level={5}>基础信息</TitleLabel>
      <Form
        name="base-info"
        {...formItemLayout}
        className="base-info-from ant-form-text"
      >
        <Form.Item label="用户头像">
          <Upload
            action="/api/micro-main/v1/common/upload/avatar"
            showUploadList={false}
            onChange={handleAvatarUploadChange}
            disabled={uploadLoading}
            headers={{
              User: `usercode:${_Cookies.get('id')}`,
              Authorization: `Bearer ${getToken()}`
            }}
          >
            <div
              className="avatar-wrap"
              style={{
                background: colorBgLayout,
                borderColor: colorBorder,
                borderRadius
              }}
            >
              {userInfo.avatar ? (
                <img
                  src={userInfo.avatar}
                  style={{ borderRadius }}
                  alt="avatar"
                  className="avatar"
                />
              ) : (
                'ss'
              )}
              <div
                className="avatar-edit"
                style={{
                  backgroundColor: colorBorderBg,
                  fontSize: fontSizeSM,
                  borderBottomLeftRadius: borderRadius,
                  borderBottomRightRadius: borderRadius
                }}
              >
                {uploadLoading ? (
                  <>
                    <LoadingOutlined />
                    <span style={{ marginLeft: marginXS }}>上传中</span>
                  </>
                ) : (
                  <>
                    <EditOutlined />
                    <span style={{ marginLeft: marginXS }}>编辑头像</span>
                  </>
                )}
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="用户名">{userInfo.name}</Form.Item>
        <Form.Item label="用户 ID">{userInfo.id}</Form.Item>
        <Form.Item label="邮箱">{userInfo.email}</Form.Item>
      </Form>
    </div>
  );
};

export default BaseInfo;
