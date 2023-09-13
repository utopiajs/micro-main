import { formItemEditLayout, formTailLayout } from '@/constants/form';
import { coreAuthManageApi } from '@/services';
import { isApiSuccess, useSiteToken } from '@utopia/micro-main-utils';
import type { AuthManage, AuthManageGroupOption } from '@utopia/micro-types';
import { Button, Form, Input, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

export type AuthApiOperationDefaultValue = Pick<
  AuthManage,
  'name' | 'description' | 'id' | 'code' | 'group'
>;

export interface AuthApiOperationProps {
  onCreatedSuccess?: () => void;
  onEditSuccess?: () => void;
  defaultValue?: AuthApiOperationDefaultValue;
}

const AuthApiOperation: React.FC<AuthApiOperationProps> = (props) => {
  const { onCreatedSuccess, onEditSuccess, defaultValue } = props;
  const [initialValues] = useState(defaultValue);
  const [authApiGroupOptions, setAuthApiGroupOptions] = useState<
    AuthManageGroupOption[]
  >([]);

  const [authApiOperationForm] = Form.useForm();
  const {
    token: { marginXS }
  } = useSiteToken();

  const handleFinish = useCallback(
    async (value: any) => {
      // edit
      if (initialValues?.id) {
        const { errorCode } = await coreAuthManageApi.authManageUpdateWithPatch(
          {
            ...value,
            id: initialValues.id
          }
        );
        if (isApiSuccess(errorCode)) {
          onEditSuccess?.();
        }
      } else {
        // new
        const { errorCode } = await coreAuthManageApi.authManageCreateWithPost(
          value
        );
        if (isApiSuccess(errorCode)) {
          onCreatedSuccess?.();
        }
      }
    },
    [onCreatedSuccess, onEditSuccess, initialValues]
  );

  const handleReset = useCallback(() => {
    authApiOperationForm.resetFields();
  }, [authApiOperationForm]);

  const getAuthApiGroupOptionList = useCallback(async () => {
    const { errorCode, data } =
      await coreAuthManageApi.authManageGroupOptionListWithGet();
    if (isApiSuccess(errorCode)) {
      setAuthApiGroupOptions(data);
      // 兼容处理 roleId
      authApiOperationForm.setFieldsValue({
        group: initialValues?.group.value
      });
    }
  }, [authApiOperationForm, initialValues]);

  useEffect(() => {
    getAuthApiGroupOptionList();
  }, [getAuthApiGroupOptionList]);

  return (
    <Form
      name="auth-api-operation"
      form={authApiOperationForm}
      onFinish={handleFinish}
      initialValues={initialValues}
      {...formItemEditLayout}
    >
      <Form.Item
        label="数据权限名称"
        name="name"
        rules={[
          { required: true, message: '请输入数据权限名称' },
          { max: 15, min: 3, message: '用户名字符长度为3-15' }
        ]}
      >
        <Input placeholder="请输入数据权限名称" />
      </Form.Item>
      <Form.Item
        label="数据权限编码"
        tooltip="该编码用于后台权限中间件识别编码"
        name="code"
        rules={[{ required: true, message: '请输入数据权限名称' }]}
      >
        <Input
          placeholder="请输入数据权限编码"
          style={{ display: 'inline-block' }}
        />
      </Form.Item>
      <Form.Item
        label="分组名称"
        name="group"
        rules={[{ required: true, message: '请选择分组名称' }]}
      >
        <Select
          options={authApiGroupOptions}
          allowClear
          placeholder="请选择角色"
        />
      </Form.Item>
      <Form.Item label="请求路径" name="apiUrl">
        <Input placeholder="请输入请求路径" />
      </Form.Item>
      <Form.Item label="数据权限描述" name="description">
        <Input.TextArea placeholder="请输入数据权限描述" />
      </Form.Item>
      <Form.Item {...formTailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: marginXS }}
        >
          {initialValues?.id ? '修改' : '提交'}
        </Button>
        <Button onClick={handleReset}>重置</Button>
      </Form.Item>
    </Form>
  );
};

export default AuthApiOperation;
