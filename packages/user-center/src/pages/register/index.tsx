// 注册页面
import { formItemLayout, formTailLayout } from '@/constants';
import qiankunStateFromMaster from '@/mock/qiankunStateFromMaster';
import { coreAuthApi, coreUserApi } from '@/services';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import {
  commonRules,
  getQueryParams,
  isApiSuccess,
  ROUTE_LOGIN_PATH,
  useSiteToken
} from '@utopia/micro-main-utils';
import type { QiankunStateFromMasterProps } from '@utopia/micro-types';
import { Button, Form, Input, message } from 'antd';
import React, { useCallback } from 'react';
import Styles from './index.less';

const userFieldsMapping = {
  name: '用户名',
  email: '邮箱'
};
const { redirectUrl = '/' } = getQueryParams();

const RegisterPage: React.FC = () => {
  const { qiankunGlobalState }: QiankunStateFromMasterProps =
    useModel('@@qiankunStateFromMaster') || qiankunStateFromMaster;
  const { clientConfig } = qiankunGlobalState;

  const [messageApi, messageContextHolder] = message.useMessage();
  const {
    token: { colorBgContainer, padding }
  } = useSiteToken();

  const checkUserInfo = useCallback(async (value, type) => {
    if (
      !value ||
      (type === 'name' && value.length < 3) ||
      value.length > 15 ||
      (type === 'email' && !commonRules.email.test(value))
    ) {
      return Promise.resolve();
    }
    const checkInfo = {
      type
    };
    checkInfo[type] = value;
    const { errorCode, data } = await coreUserApi.usersInfoCheckWithGet(
      checkInfo
    );
    if (isApiSuccess(errorCode)) {
      if (data.isTaken) {
        return Promise.reject(
          new Error(`该${userFieldsMapping[type]}已被注册使用`)
        );
      }
    }
    return Promise.resolve();
  }, []);

  // register
  const handleFinish = useCallback(
    async (values) => {
      const registerInfo = {
        name: values.name,
        email: values.email,
        password: values.password
      };
      const { errorCode } = await coreAuthApi.authRegisterWithPost(
        registerInfo
      );
      if (isApiSuccess(errorCode)) {
        messageApi.success('注册成功，欢迎加入 Utopia.space');

        setTimeout(() => {
          window.location.href = `${ROUTE_LOGIN_PATH}?redirectUrl=${redirectUrl}`;
        }, 1500);
      }
    },
    [messageApi]
  );

  return (
    <div className={Styles['register-page-wrap']}>
      <div
        className="register-panel"
        style={{
          backgroundColor: colorBgContainer,
          padding
        }}
      >
        <div className="register-panel-header">
          <img alt="" className="logo" src={clientConfig.logo} />
          <div>{clientConfig.name}</div>
        </div>
        <div className="register-panel-body">
          <Form
            name="user-center-register"
            className="register-form"
            onFinish={handleFinish}
            {...formItemLayout}
          >
            <Form.Item
              name="name"
              label="用户名"
              validateTrigger="onBlur"
              hasFeedback
              rules={[
                { required: true, message: '用户名是必填项' },
                { max: 15, min: 3, message: '用户名字符长度为3-15' },
                {
                  validator: (_, value) => checkUserInfo(value, 'name')
                }
              ]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              validateTrigger="onBlur"
              hasFeedback
              rules={[
                { required: true, message: '邮箱是必填项' },
                { pattern: commonRules.email, message: '请正确输入邮箱格式' },
                {
                  validator: (_, value) => checkUserInfo(value, 'email')
                }
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              hasFeedback
              rules={[
                { required: true, message: '密码是必填项' },
                {
                  pattern: /^(?=.*[a-zA-Z])(?=.*\d).{9,}$/,
                  message: '密码长度至少8位，并且需包含数字以及字母'
                }
              ]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              label="确认密码"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请确认你的密码'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('与输入的密码不匹配!'));
                  }
                })
              ]}
            >
              <Input.Password placeholder="请重复密码" />
            </Form.Item>
            <Form.Item {...formTailLayout}>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div
        className="back-button"
        onClick={() => {
          history.back();
        }}
      >
        <ArrowLeftOutlined />
        <span className="text">返回</span>
      </div>
      {messageContextHolder}
    </div>
  );
};

export default RegisterPage;
