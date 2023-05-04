/** 偏好设置 */
import { Form, type MenuTheme } from 'antd';
import { useCallback, useRef, useState, type FC } from 'react';
import BlockCheckbox from './block-check-box';
import Styles from './index.less';

export interface IPreferenceSettings {
  navTheme: MenuTheme;
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

const PreferenceSetting: FC = () => {
  const [settingState, setSettingState] = useState<IPreferenceSettings>({
    navTheme: 'dark'
  });

  const preStateRef = useRef(settingState);

  const handleSetSettingState = useCallback((key: string, value: string) => {
    const nextState = { ...preStateRef.current };
    nextState[key] = value;
    preStateRef.current = nextState;
    setSettingState(nextState);
  }, []);

  const { navTheme } = settingState;
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
      </Form>
    </div>
  );
};

export default PreferenceSetting;
