/** 偏好设置 */
import { Form, type MenuTheme } from 'antd';
import { useCallback, useRef, useState, type FC } from 'react';
import BlockCheckbox from './block-check-box';
import Styles from './index.less';
import ThemeColor from './ThemeColor';

export interface IPreferenceSettings {
  navTheme: MenuTheme;
  primaryColor: string;
}
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
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

const PreferenceSetting: FC = () => {
  const [settingState, setSettingState] = useState<IPreferenceSettings>({
    navTheme: 'dark',
    primaryColor: '#1677FF'
  });

  const preStateRef = useRef(settingState);

  const handleSetSettingState = useCallback((key: string, value: string) => {
    const nextState = { ...preStateRef.current };
    nextState[key] = value;
    preStateRef.current = nextState;
    setSettingState(nextState);
  }, []);

  const { navTheme, primaryColor } = settingState;
  return (
    <div className={Styles['preference-setting-wrap']}>
      <Form name="preference-strring" {...formItemLayout}>
        <Form.Item label="主题风格">
          <BlockCheckbox
            list={themeList}
            value={navTheme}
            key="navTheme"
            onChange={(value) => {
              handleSetSettingState('navTheme', value);
            }}
          />
        </Form.Item>
        <Form.Item label="主题色">
          <ThemeColor
            colorList={colorList}
            value={primaryColor}
            key="primaryColor"
            onChange={(value) => {
              handleSetSettingState('primaryColor', value);
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default PreferenceSetting;
