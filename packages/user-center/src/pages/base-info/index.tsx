import qiankunStateFromMaster from '@/mock/qiankunStateFromMaster';
import { useModel } from '@umijs/max';
import { useSiteToken } from '@utopia/micro-main-utils';
import { type IInitialState } from '@utopia/micro-types';
import { Form, Upload } from 'antd';
import React, { useState } from 'react';
import Styles from './index.less';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};

const BaseInfo: React.FC = () => {
  const { initialState }: { initialState: IInitialState } =
    useModel('@@qiankunStateFromMaster') || qiankunStateFromMaster;

  const [userInfo, setUserInfo] = useState(initialState.currentUser);
  const {
    token: { colorBgLayout, borderRadius }
  } = useSiteToken();

  return (
    <div className={Styles['base-info-wrap']}>
      <Form name="base-info" {...formItemLayout} className="base-info-from">
        <Form.Item label="用户头像">
          <Upload>
            {userInfo.avatar ? (
              <img
                src={userInfo.avatar}
                alt="avatar"
                style={{ background: colorBgLayout, borderRadius }}
                className="avatar"
              />
            ) : (
              'ss'
            )}
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
