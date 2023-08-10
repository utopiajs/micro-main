// login page
import qiankunStateFromMaster from '@/mock/qiankunStateFromMaster';
import { coreAuthApi, coreCommonsApi } from '@/services';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import {
  getQueryParams,
  isApiSuccess,
  useSiteToken
} from '@utopia/micro-main-utils';
import type { BingImg, QiankunStateFromMasterProps } from '@utopia/micro-types';
import { Button, Form, Input, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import styles from './index.less';

const { Title, Text } = Typography;
const { redirectUrl = '/' } = getQueryParams();
const bingImgInfoCacheKey = 'utopia-uc-bing-img-cache';

const getCurrentDate = () => {
  const currentDate = new Date();
  return `${currentDate.getFullYear()}${String(
    currentDate.getMonth() + 1
  ).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}`;
};

const LoginPage = () => {
  const [bingImgInfo, setBingImgInfo] = useState<BingImg>({});
  const { qiankunGlobalState }: QiankunStateFromMasterProps =
    useModel('@@qiankunStateFromMaster') || qiankunStateFromMaster;

  const {
    token: { colorBgContainer, padding, boxShadow, fontSizeSM }
  } = useSiteToken();

  useEffect(() => {
    (async () => {
      try {
        const bingImgInfoCache: BingImg = JSON.parse(
          localStorage.getItem(bingImgInfoCacheKey) || '{}'
        );

        if (bingImgInfoCache.enddate === getCurrentDate()) {
          setBingImgInfo(bingImgInfoCache);
          return;
        }
        const { data, errorCode } =
          await coreCommonsApi.commonStaticBingImgWithGet(
            {},
            { showErrorMessage: false }
          );
        if (isApiSuccess(errorCode)) {
          setBingImgInfo(data[0]);
          // 同一天避免重复请求
          localStorage.setItem(bingImgInfoCacheKey, JSON.stringify(data[0]));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, []);

  const handleLoginFormFinish = useCallback(async (value) => {
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
        <Title level={4}>{qiankunGlobalState?.client?.clientName}</Title>
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
            {qiankunGlobalState?.client?.copyRight}
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
