/** 偏好设置 */
import { Form } from 'antd';
import { type FC } from 'react';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

const PreferenceSetting: FC = () => {
  return (
    <div>
      <Form name="preference-strring" {...formItemLayout}>
        <Form.Item label="主题风格">
          <span className="ant-form-text">浅色模式</span>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PreferenceSetting;
