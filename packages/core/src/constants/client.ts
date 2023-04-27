import { IClientConstantProps } from '@utopia/micro-types';

const CLIENT_NAME = '微前端主平台';
const CLIENT_VERSION = '1.0.0';
const CLIENT_COPYRIGHT = 'KuangPF | Copyright © 2022-present';
const CLIENT_LOGO =
  'https://avatars.githubusercontent.com/u/53040934?s=200&v=4';

const clientConstantProps: IClientConstantProps = {
  clientName: CLIENT_NAME,
  clientVersion: CLIENT_VERSION,
  copyRight: CLIENT_COPYRIGHT,
  logo: CLIENT_LOGO
};

export { clientConstantProps };
