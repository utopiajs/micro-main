import { formItemEditLayout, formTailLayout } from '@/constants/form';
import { coreRoleApi } from '@/services';
import { isApiSuccess, useSiteToken } from '@utopia/micro-main-utils';
import type { Role } from '@utopia/micro-types';

import { Button, Form, Input } from 'antd';
import React, { useCallback, useState } from 'react';

export type RoleOperationdefaultValue = Pick<
  Role,
  'name' | 'description' | 'id'
>;

export interface RoleOperationProps {
  onCreatedSuccess?: () => void;
  onEditSuccess?: () => void;
  defaultValue?: RoleOperationdefaultValue;
}

const RoleOperation: React.FC<RoleOperationProps> = (props) => {
  const { onCreatedSuccess, onEditSuccess, defaultValue } = props;
  const [initialValues] = useState(defaultValue);
  const [roleOperationForm] = Form.useForm();
  const {
    token: { marginXS }
  } = useSiteToken();

  const handleFinish = useCallback(
    async (value: any) => {
      // edit
      if (initialValues?.id) {
        const { errorCode } = await coreRoleApi.roleUpdateWithPatch({
          ...value,
          id: initialValues.id
        });
        if (isApiSuccess(errorCode)) {
          onEditSuccess?.();
        }
      } else {
        // new
        const { errorCode } = await coreRoleApi.roleCreateWithPost(value);
        if (isApiSuccess(errorCode)) {
          onCreatedSuccess?.();
        }
      }
    },
    [onCreatedSuccess, onEditSuccess, initialValues]
  );

  const handleReset = useCallback(() => {
    roleOperationForm.resetFields();
  }, [roleOperationForm]);

  return (
    <Form
      name="role-operation"
      form={roleOperationForm}
      onFinish={handleFinish}
      initialValues={initialValues}
      {...formItemEditLayout}
    >
      <Form.Item
        label="角色名称"
        name="name"
        rules={[
          { required: true, message: '请输入角色名称' },
          { max: 15, min: 3, message: '用户名字符长度为3-15' }
        ]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item label="角色描述" name="description">
        <Input.TextArea placeholder="请输入用户名" />
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

export default RoleOperation;
