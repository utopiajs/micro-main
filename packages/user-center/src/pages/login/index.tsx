// login page
import { coreAuthApi, coreCommonsApi } from '@/services';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import {
  getQueryParams,
  isApiSuccess,
  useSiteToken
} from '@utopia/micro-main-utils';
import { type BingImg, type IInitialState } from '@utopia/micro-types';
import { Button, Form, Input, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import styles from './index.less';

const { Title, Text } = Typography;
const { redirectUrl = '/' } = getQueryParams();

const LoginPage = () => {
  const [bingImgInfo, setBingImgInfo] = useState<BingImg>({});
  const {
    initialState = { currentUser: {}, client: {} }
  }: { initialState: Partial<IInitialState> } =
    useModel('@@qiankunStateFromMaster') || {};

  const {
    token: { colorBgContainer, padding, boxShadow, fontSizeSM }
  } = useSiteToken();

  useEffect(() => {
    (async () => {
      const { data, errorCode } =
        await coreCommonsApi.commonStaticBingImgWithGet();
      if (isApiSuccess(errorCode)) {
        setBingImgInfo(data[0]);
      }
    })();
  }, []);

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
        <Title level={4}>{initialState?.client?.clientName}</Title>
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
            {initialState?.client?.copyRight}
          </Text>
        </p>
      </div>
      <div
        className="bg-wrap"
        style={{
          backgroundImage: `url(https://www.bing.com${bingImgInfo.url})`
        }}
      />
    </div>
  );
};

export default LoginPage;
