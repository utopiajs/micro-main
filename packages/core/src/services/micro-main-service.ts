import { Auth } from '@/swagger-services/Auth';
import { Menus } from '@/swagger-services/Menus';
import { Users } from '@/swagger-services/Users';
import { ClientConfigs } from '@/swagger-services/ClientConfigs';

const coreUserApi = new Users();
const coreAuthApi = new Auth();
const coreMenuApi = new Menus();
const coreClientConfig = new ClientConfigs();

export { coreUserApi, coreAuthApi, coreMenuApi, coreClientConfig };
