import { Auth } from '@/swagger-services/Auth';
import { Menus } from '@/swagger-services/Menus';
import { Users } from '@/swagger-services/Users';

const coreUserApi = new Users();
const coreAuthApi = new Auth();
const coreMenuApi = new Menus();

export { coreUserApi, coreAuthApi, coreMenuApi };
