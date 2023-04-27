import { type User } from './micro-main-service/data-contracts';

interface IClientConstantProps {
  /** 平台名称 */
  clientName: string;
  /** 平台版本号 */
  clientVersion: string;
  /** copyright */
  copyRight: string
  /** logo */
  logo: string
}

interface IInitialState {
  currentUser: User;
  client: Partial<IClientConstantProps>;
}

export { IClientConstantProps, IInitialState };
