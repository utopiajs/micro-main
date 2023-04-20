import { Auth } from '@/swagger-services/Auth';
import { Users } from '@/swagger-services/Users';

const coreUserApi = new Users();
const coreAuthApi = new Auth();

export { coreUserApi, coreAuthApi };
