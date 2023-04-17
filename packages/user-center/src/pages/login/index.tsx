// login page
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useSiteToken } from '@utopia/micro-main-utils';
import { Button, Form, Input, Typography } from 'antd';
import styles from './index.less';

const { Title } = Typography;
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
        <Form.Item
          name="username"
          rules={[{ required: true, message: '用户名是必填项' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '密码是必填项' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
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
      </div>
    </div>
  );
};

export default LoginPage;
