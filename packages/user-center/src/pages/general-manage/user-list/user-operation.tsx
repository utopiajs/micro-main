import { formItemEditLayout, formTailLayout } from '@/constants/form';
import { coreRoleApi, coreUserApi } from '@/services';
import {
  commonRules,
  isApiSuccess,
  useSiteToken
} from '@utopia/micro-main-utils';
import type { Role, User } from '@utopia/micro-types';
import { Button, Form, Input, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

export type UserOperationDefaultValue = User & {
  password?: string;
};

interface UserOperationProps {
  onCreatedSuccess?: () => void;
  onEditedSuccess?: () => void;
  defaultValue?: Partial<User>;
}

const newUserDefaultValue = {
  roleList: [],
  password: 'u12345678'
};

const UserOperation: React.FC<UserOperationProps> = (props) => {
  const {
    onCreatedSuccess,
    onEditedSuccess,
    defaultValue = newUserDefaultValue
  } = props;

  const [initialValues] =
    useState<Partial<UserOperationDefaultValue>>(defaultValue);
  const [roleOptions, setRoleOptions] = useState<Role[]>([]);

  const [userOperationForm] = Form.useForm();
  const {
    token: { marginXS }
  } = useSiteToken();

  const handleFinish = useCallback(
    async (value: any) => {
      if (initialValues.id) {
        const { errorCode } = await coreUserApi.usersUpdateWithPatch({
          ...value,
          id: initialValues.id
        });
        if (isApiSuccess(errorCode)) {
          onEditedSuccess?.();
        }
      } else {
        const { errorCode } = await coreUserApi.usersCreateWithPost(value);
        if (isApiSuccess(errorCode)) {
          onCreatedSuccess?.();
        }
      }
    },
    [onCreatedSuccess, onEditedSuccess, initialValues]
  );

  const handleReset = useCallback(() => {
    userOperationForm.resetFields();
  }, [userOperationForm]);

  const getRoleList = useCallback(async () => {
    const { errorCode, data } = await coreRoleApi.roleOptionListWithGet();
    if (isApiSuccess(errorCode)) {
      setRoleOptions(data);
      // 兼容处理 roleId
      userOperationForm.setFieldsValue({
        roleIds: initialValues.roleList?.map((item) => item.id)
      });
    }
  }, [userOperationForm, initialValues]);

  useEffect(() => {
    getRoleList();
  }, [getRoleList]);

  return (
    <Form
      name="user-operation"
      form={userOperationForm}
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
      {!initialValues.id && (
        <Form.Item label="密码" name="password">
          <Input disabled />
        </Form.Item>
      )}
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
      <Form.Item label="角色" name="roleIds">
        <Select
          options={roleOptions}
          mode="multiple"
          allowClear
          fieldNames={{ label: 'name', value: 'id' }}
          placeholder="请选择角色"
        />
      </Form.Item>
      <Form.Item {...formTailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: marginXS }}
        >
          {initialValues.id ? '保存修改' : '新建用户'}
        </Button>
        <Button onClick={handleReset}>重置</Button>
      </Form.Item>
    </Form>
  );
};

export default UserOperation;
