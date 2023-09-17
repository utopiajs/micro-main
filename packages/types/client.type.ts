import type { MenuTheme } from 'antd';
import type {
  ClientConfig,
  MenuTreeNode,
  User
} from './micro-main-service/data-contracts';

interface ISiteThemeConfig {
  theme: MenuTheme;
  colorPrimary: string;
  borderRadius: number;
}

interface IInitialState {
  currentUser: User;
  clientConfig: ClientConfig;
  siteThemeConfig: ISiteThemeConfig;
  menuConfigUserTree: MenuTreeNode[];
}

interface QiankunStateFromMasterProps {
  qiankunGlobalState: IInitialState;
  setQiankunGlobalState: React.Dispatch<React.SetStateAction<IInitialState>>;
}

export {
  IInitialState,
  ISiteThemeConfig,
  QiankunStateFromMasterProps
};
