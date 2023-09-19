// 平台配置信息
import { coreClientConfig } from '@/services';
import { useModel } from '@umijs/max';
import { TitleLabel } from '@utopia/core-component';
import {
  formItemEditLayout,
  formTailLayout,
  useSiteToken
} from '@utopia/micro-main-utils';
import type { ClientConfig } from '@utopia/micro-types';
import { Button, DatePicker, Form, Input, message } from 'antd';
import dayjs from 'dayjs';

import React, { useCallback, useState } from 'react';

const ClientConfigPage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [initialValues] = useState<
    ClientConfig & {
      deployTimeDayJs?: dayjs.Dayjs;
    }
  >(initialState?.clientConfig ?? {});
  const [clientConfigForm] = Form.useForm();
  const [messageApi, messageContextHolder] = message.useMessage();

  const {
    token: { marginXS, paddingXS }
  } = useSiteToken();

  const handleFinish = useCallback(
    async (values) => {
      // hack deployTime
      values.deployTime = values.deployTimeDayJs.valueOf();
      delete values.deployTimeDayJs;
      // values.deployTime = values.deployTime.format('YYYY-MM-DD HH:mm:ss');
      const { errorCode } = await coreClientConfig.clientConfigCreateWithPost(
        values
      );
      if (errorCode) {
        messageApi.success('修改成功');
      }
    },
    [messageApi]
  );

  const handleReset = useCallback(() => {
    clientConfigForm.setFieldsValue(initialValues);
  }, [initialValues, clientConfigForm]);

  // hack deployTime
  initialValues.deployTimeDayJs = dayjs(initialValues.deployTime);

  return (
    <div style={{ padding: paddingXS }}>
      <TitleLabel level={5}>平台配置</TitleLabel>
      <div>
        <Form
          name="client-config-form"
          form={clientConfigForm}
          onFinish={handleFinish}
          initialValues={initialValues}
          {...formItemEditLayout}
        >
          <Form.Item label="Logo" name="logo">
            <Input placeholder="请输入 logo 地址" />
          </Form.Item>
          <Form.Item label="平台名称" name="name">
            <Input placeholder="请输入平台名称" />
          </Form.Item>
          <Form.Item label="平台描述" name="description">
            <Input.TextArea placeholder="请输入请输入平台描述" />
          </Form.Item>
          <Form.Item label="平台版本" name="version">
            <Input placeholder="请输入平台版本" />
          </Form.Item>
          <Form.Item label="发布日期" name="deployTimeJs">
            <DatePicker showTime placeholder="请输入请发布日期" />
          </Form.Item>
          <Form.Item label="平台官网" name="siteUrl">
            <Input placeholder="请输入平台官网" />
          </Form.Item>
          <Form.Item label="联系我们" name="contact">
            <Input placeholder="请输入联系方式" />
          </Form.Item>
          <Form.Item label="版权信息" name="copyright">
            <Input.TextArea
              autoSize={{ minRows: 3 }}
              showCount
              placeholder="请输入版权信息"
            />
          </Form.Item>
          <Form.Item {...formTailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: marginXS }}
            >
              保存
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Form.Item>
        </Form>
      </div>
      {messageContextHolder}
    </div>
  );
};

export default ClientConfigPage;
