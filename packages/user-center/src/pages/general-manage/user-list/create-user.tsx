import { formItemEditLayout, formTailLayout } from '@/constants/form';
import { coreUserApi } from '@/services';
import {
  commonRules,
  isApiSuccess,
  useSiteToken
} from '@utopia/micro-main-utils';
import type { SelectProps } from 'antd';
import { Button, Form, Input, Select } from 'antd';
import React, { useCallback, useState } from 'react';

interface CreateUserProps {
  onCreatedSuccess: () => void;
}
const roleOptions: SelectProps['options'] = [
  {
    value: 'user',
    label: 'user'
  },
  {
    value: 'admin',
    label: 'admin',
    disabled: true
  }
];

const CreateUser: React.FC<CreateUserProps> = (props) => {
  const { onCreatedSuccess } = props;
  const [initialValues] = useState({ role: 'user', password: 'u12345678' });
  const [createUserForm] = Form.useForm();
  const {
    token: { marginXS }
  } = useSiteToken();

  const handleFinish = useCallback(
    async (value: any) => {
      const { errorCode } = await coreUserApi.usersCreateWithPost(value);
      if (isApiSuccess(errorCode)) {
        onCreatedSuccess();
      }
    },
    [onCreatedSuccess]
  );

  const handleReset = useCallback(() => {
    createUserForm.resetFields();
  }, [createUserForm]);

  return (
    <Form
      name="create-user"
      form={createUserForm}
      initialValues={initialValues}
      onFinish={handleFinish}
      {...formItemEditLayout}
    >
      <Form.Item
        label="用户名"
        name="name"
        rules={[
          { required: true, message: '请输入用户名' },
          { max: 15, min: 3, message: '用户名字符长度为3-15' }
        ]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item label="初始化密码" name="password">
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          { required: true, message: '请输入邮箱' },
          { pattern: commonRules.email, message: '请正确输入邮箱格式' }
        ]}
      >
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item label="角色" name="role">
        <Select options={roleOptions} placeholder="请选择角色" />
      </Form.Item>
      <Form.Item {...formTailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: marginXS }}
        >
          提交
        </Button>
        <Button onClick={handleReset}>重置</Button>
      </Form.Item>
    </Form>
  );
};

export default CreateUser;
