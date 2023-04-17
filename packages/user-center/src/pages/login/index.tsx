// login page
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useSiteToken } from '@utopia/micro-main-utils';
import { Button, Form, Input, Typography } from 'antd';
import styles from './index.less';

const { Title, Text } = Typography;

const LoginPage = () => {
  const {
    token: { colorBgContainer, padding, boxShadow }
  } = useSiteToken();
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
        <Title level={4}>微前端主平台</Title>
        <Form name="user-center-login" className="login-form">
          <Form.Item
            name="username"
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
          <Text type="secondary">KuangPF | Copyright © 2022-present</Text>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
