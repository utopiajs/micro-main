/** 偏好设置 */
import { TitleLabel } from '@utopia/core-component';
import qiankunStateFromMaster from '@/mock/qiankunStateFromMaster';
import { coreUserApi } from '@/services';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { isApiSuccess, useSiteToken } from '@utopia/micro-main-utils';
import type { QiankunStateFromMasterProps } from '@utopia/micro-types';
import type { MenuTheme } from 'antd';
import { Button, Form, message, Radio, Tooltip } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import BlockCheckbox from './block-check-box';
import Styles from './index.less';
import ThemeColor from './ThemeColor';

export interface IPreferenceSettings {
  theme: MenuTheme;
  colorPrimary: string;
  borderRadius: number;
}
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
};
const formTailLayout = {
  wrapperCol: { offset: 4, span: 20 }
};

const themeList = [
  {
    key: 'light',
    url: 'https://gw.alipayobjects.com/zos/antfincdn/NQ%24zoisaD2/jpRkZQMyYRryryPNtyIC.svg',
    title: '亮色风格'
  },
  {
    key: 'dark',
    url: 'https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg',
    title: '暗色风格'
  }
];

const colorList = [
  { key: 'techBlue', color: '#1677FF', title: '科技蓝（默认）' },
  { key: 'daybreak', color: '#1890ff', title: '拂晓' },
  { key: 'dust', color: '#F5222D', title: '薄暮' },
  { key: 'volcano', color: '#FA541C', title: '火山' },
  { key: 'sunset', color: '#FAAD14', title: '日暮' },
  { key: 'cyan', color: '#13C2C2', title: '明青' },
  { key: 'green', color: '#52C41A', title: '极光绿' },
  { key: 'geekblue', color: '#2F54EB', title: '极客蓝' },
  { key: 'purple', color: '#722ED1', title: '酱紫' }
];
const borderRadiusList = [
  {
    label: '小',
    value: 4
  },
  {
    label: '中',
    value: 6
  },
  {
    label: '大',
    value: 8
  }
];

const PreferenceSetting: React.FC = () => {
  const {
    qiankunGlobalState,
    setQiankunGlobalState
  }: QiankunStateFromMasterProps =
    useModel('@@qiankunStateFromMaster') || qiankunStateFromMaster;
  const [settingState] = useState(qiankunGlobalState.siteThemeConfig);
  const currentInitialStateRef =
    useRef<QiankunStateFromMasterProps['qiankunGlobalState']>(
      qiankunGlobalState
    );
  const [messageApi, contextHolder] = message.useMessage();
  const {
    token: { padding }
  } = useSiteToken();

  const [preferenceSettingForm] = Form.useForm();

  const handleValueChange = useCallback(
    (_, allFields) => {
      const nextQiankunGlobalState: QiankunStateFromMasterProps['qiankunGlobalState'] =
        {
          ...qiankunGlobalState,
          siteThemeConfig: allFields
        };
      setQiankunGlobalState(nextQiankunGlobalState);
    },
    [qiankunGlobalState, setQiankunGlobalState]
  );

  const handleReset = useCallback(() => {
    preferenceSettingForm.resetFields();
    handleValueChange('', settingState);
  }, [preferenceSettingForm, handleValueChange, settingState]);

  // handle finish
  const handleFinish = useCallback(
    async (values) => {
      const { errorCode } = await coreUserApi.usersUpdateWithPatch({
        preferenceSetting: values
      });
      if (isApiSuccess(errorCode)) {
        messageApi.success('主题修改成功');
        currentInitialStateRef.current = {
          ...qiankunGlobalState,
          siteThemeConfig: values
        };
      }
    },
    [qiankunGlobalState, messageApi]
  );

  useEffect(() => {
    // 全局样式保持一致，防止预览后不保存而导致表单值与样式不一致
    return () => {
      setQiankunGlobalState(currentInitialStateRef.current);
    };
  }, [setQiankunGlobalState]);

  return (
    <div className={Styles['preference-setting-wrap']} style={{ padding }}>
      <TitleLabel level={5}>系统主题</TitleLabel>
      <Form
        name="preference-setting"
        initialValues={settingState}
        form={preferenceSettingForm}
        onValuesChange={handleValueChange}
        onFinish={handleFinish}
        {...formItemLayout}
      >
        <Form.Item label="主题风格" name="theme">
          <BlockCheckbox list={themeList} key="theme" />
        </Form.Item>
        <Form.Item label="主题色" name="colorPrimary">
          <ThemeColor colorList={colorList} key="colorPrimary" />
        </Form.Item>
        <Form.Item label="圆角大小" name="borderRadius">
          <Radio.Group
            options={borderRadiusList}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
          <Button onClick={handleReset}>重置</Button>
          <Tooltip title="点击保存按钮存储系统主题设置值，而非临时预览">
            <QuestionCircleOutlined style={{ marginLeft: '20px' }} />
          </Tooltip>
        </Form.Item>
      </Form>
      {contextHolder}
    </div>
  );
};

export default PreferenceSetting;
