import type { MenuTheme } from 'antd';
import type { MenuTreeNode, User } from './micro-main-service/data-contracts';

interface IClientConstantProps {
  /** 平台名称 */
  clientName: string;
  /** 平台版本号 */
  clientVersion: string;
  /** copyright */
  copyRight: string;
  /** logo */
  logo: string;
}

interface ISiteThemeConfig {
  theme: MenuTheme;
  colorPrimary: string;
  borderRadius: number;
}

interface IInitialState {
  currentUser: User;
  client: Partial<IClientConstantProps>;
  siteThemeConfig: ISiteThemeConfig;
  menuConfigUserTree: MenuTreeNode[];
}

interface QiankunStateFromMasterProps {
  qiankunGlobalState: IInitialState;
  setQiankunGlobalState: React.Dispatch<React.SetStateAction<IInitialState>>;
}

export {
  IClientConstantProps,
  IInitialState,
  ISiteThemeConfig,
  QiankunStateFromMasterProps
};
