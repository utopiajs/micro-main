const { generateApi } = require('swagger-typescript-api');
const path = require('path');

const apis = [
  {
    output: path.resolve(process.cwd(), './packages/core/src/swagger-services/'),
    url: 'http://localhost:3000/api/micro-main/v1/docs/swagger.json'
  },
  {
    output: path.resolve(process.cwd(), './packages/user-center/src/swagger-services/'),
    url: 'http://localhost:3000/api/micro-main/v1/docs/swagger.json'
  }
];

apis?.forEach((api, index) => {
  setTimeout(() => {
    generateApi({
      output: api.output,
      templates: path.resolve(process.cwd(), './templates/core'),
      url: api.url,
      httpClientType: 'axios',
      modular: true,
      cleanOutput: true,
      moduleNameIndex: 1, // 0 api, 1 api htt-client data-contracts, 2 apis htt-client data-contracts
      moduleNameFirstTag: true, // apis htt-client data-contracts
      unwrapResponseData: true,
      generateUnionEnums: true
    });
  }, index * 1500);
});
