import { Auth } from '@/swagger-services/Auth';
import { Commons } from '@/swagger-services/Commons';
import { Menus } from '@/swagger-services/Menus';
import { RoleMappingModules } from '@/swagger-services/RoleMappingModules';
import { Roles } from '@/swagger-services/Roles';
import { Users } from '@/swagger-services/Users';

const coreUserApi = new Users();
const coreAuthApi = new Auth();
const coreRoleApi = new Roles();
const coreRoleMappingModules = new RoleMappingModules();
const coreMenuApi = new Menus();
const coreCommonsApi = new Commons();

export {
  coreUserApi,
  coreAuthApi,
  coreMenuApi,
  coreRoleApi,
  coreCommonsApi,
  coreRoleMappingModules
};
