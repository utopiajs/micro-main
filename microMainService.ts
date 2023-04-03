// pontTemplate.ts

import { CodeGenerator, Interface } from 'pont-engine';

export default class MyGenerator extends CodeGenerator {
  static getInterfaceContent(inter: Interface) {
    const paramsCode = inter.getParamsCode();
    const bodyParamsCode = inter.getBodyParamsCode();
    const method = inter.method.toUpperCase();
    const requestParams = bodyParamsCode ? 'bodyParams = {}' : 'params = {}';

    return `
    /**
    * @description ${inter.description}
    */
    
    import { getUrl } from 'src/utils/getUrl';
    import Request from 'src/utils/requests';
    import * as defs from '../../baseClass';
    
    export ${paramsCode}
    
    export const init = ${inter.response.initialValue};
    
    export async function request(${requestParams}) {
    return Request({
    url: getUrl("${inter.path}", ${
      bodyParamsCode ? 'bodyParams' : 'params'
    }, "${method}"),
    ${bodyParamsCode ? 'params: bodyParams' : 'params'},
    method: '${inter.method}',
    });
    }
    
    export function createFetchAction(types, stateKey) {
    return (${
      bodyParamsCode ? 'bodyParams = {}' : 'params = {}'
    }, meta?: any) => {
    return {
    types,
    meta,
    stateKey,
    method: '${inter.method}',
    url: getUrl("${inter.path}", ${
      bodyParamsCode ? 'bodyParams' : 'params'
    }, "${method}"),
    ${bodyParamsCode ? 'params: bodyParams,' : 'params,'}
    init,
    };
    };
    }
    `;
  }
}
