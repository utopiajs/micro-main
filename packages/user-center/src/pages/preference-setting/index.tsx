/** 偏好设置 */
import { useModel } from '@umijs/max';
import { PUB_SUB_TYPES } from '@utopia/micro-types';
import { Button, Form, Radio, type MenuTheme } from 'antd';
import { useCallback, useState, type FC } from 'react';
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
    title: '亮色菜单风格'
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

const PreferenceSetting: FC = () => {
  const { initialState } = useModel('@@qiankunStateFromMaster');
  const [settingState] = useState<IPreferenceSettings>(
    initialState?.siteThemeConfig
  );

  const [preferenceSettingForm] = Form.useForm();

  const handleReset = useCallback(() => {
    preferenceSettingForm.resetFields();
  }, [preferenceSettingForm]);

  const handleValueChange = useCallback((_, allFields) => {
    window._MICRO_MAIN_CORE_PUB_SUB_?.publish(
      PUB_SUB_TYPES.GET_SITE_THEME_VALUE,
      allFields
    );
  }, []);

  return (
    <div className={Styles['preference-setting-wrap']}>
      <Form
        name="preference-setting"
        initialValues={settingState}
        form={preferenceSettingForm}
        onValuesChange={handleValueChange}
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
        </Form.Item>
      </Form>
    </div>
  );
};

export default PreferenceSetting;
