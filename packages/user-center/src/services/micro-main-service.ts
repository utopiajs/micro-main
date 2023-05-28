import { Auth } from '@/swagger-services/Auth';
import { Users } from '@/swagger-services/Users';
import { Commons } from '@/swagger-services/Commons';

const coreUserApi = new Users();
const coreAuthApi = new Auth();
const coreCommonsApi = new Commons();

export { coreUserApi, coreAuthApi, coreCommonsApi };
