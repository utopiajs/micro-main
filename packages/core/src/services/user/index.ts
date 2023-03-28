import { request } from '@utopia/micro-main-utils';

const getUserInfo = (id: string) =>
  request({
    url: `/api/micro-main/v1/users/${id}`
  });

export { getUserInfo };
