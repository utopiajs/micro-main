/* eslint-disable no-console */
const { generateApi } = require('swagger-typescript-api');
const path = require('path');
const fs = require('fs');

const apis = [
  {
    output: path.resolve(
      process.cwd(),
      './packages/core/src/swagger-services/'
    ),
    url: 'http://localhost:3000/api/micro-main/v1/docs/swagger.json',
    name: 'core'
  },
  {
    output: path.resolve(
      process.cwd(),
      './packages/user-center/src/swagger-services/'
    ),
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
    }).then(() => {
      if (api.name === 'core') {
        // copy data-contracts types
        fs.copyFile(
          path.resolve(
            process.cwd(),
            './packages/core/src/swagger-services/data-contracts.ts'
          ),
          path.resolve(
            process.cwd(),
            './packages/types/micro-main-service/data-contracts.ts'
          ),
          (error) => {
            if (error) {
              console.error(error);
            } else {
              console.log('data-contracts done');
            }
          }
        );
      }
    });
  }, index * 1500);
});
