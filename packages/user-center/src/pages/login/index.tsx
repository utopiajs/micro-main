// login page
import { coreAuthApi } from '@/services';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  getQueryParams,
  isApiSuccess,
  useSiteToken
} from '@utopia/micro-main-utils';
import { type IInitialState } from '@utopia/micro-types';
import { Button, Form, Input, Typography } from 'antd';
import { useCallback } from 'react';
import { useModel } from '@umijs/max';
import styles from './index.less';

const { Title, Text } = Typography;
const { redirectUrl = '/' } = getQueryParams();

const LoginPage = () => {
  const {
    initialState = { currentUser: {}, client: {} }
  }: { initialState: IInitialState } =
    useModel('@@qiankunStateFromMaster') || {};

  const {
    token: { colorBgContainer, padding, boxShadow, fontSizeSM }
  } = useSiteToken();

  const handleLoginFormFinish = useCallback(async (value: any) => {
    const { errorCode } = await coreAuthApi.authLoginWithPost(value);
    if (isApiSuccess(errorCode)) {
      window.location.href = redirectUrl;
    }
  }, []);

  return (
    <div className={styles['login-page-content']}>
      <div
        className="login-panel-wrap"
        style={{
          backgroundColor: colorBgContainer,
          padding,
          boxShadow
        }}
      >
        <Title level={4}>{initialState?.client.clientName}</Title>
        <Form
          name="user-center-login"
          className="login-form"
          onFinish={handleLoginFormFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: '用户名是必填项' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '密码是必填项' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登陆
            </Button>
          </Form.Item>
        </Form>
        <p>
          <Text type="secondary" style={{ fontSize: fontSizeSM }}>
            {initialState.client.copyRight}
          </Text>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
