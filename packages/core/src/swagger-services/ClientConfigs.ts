/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ClientConfig, Error } from './data-contracts';
import { HttpClient, RequestParams, type ResponseCommonType } from './http-client';

export class ClientConfigs extends HttpClient {
  /**
   * No description
   *
   * @tags ClientConfigs
   * @name ClientConfigCreateWithPost
   * @summary Create a client config
   * @request POST:/client-config/create
   * @secure
   */
  clientConfigCreateWithPost = (
    data: ClientConfig,
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<ClientConfig>, Error>({
      url: `/api/micro-main/v1/client-config/create`,
      method: 'POST',
      data: data,
      ...params
    });
  /**
   * No description
   *
   * @tags ClientConfigs
   * @name ClientConfigInfoWithGet
   * @summary Create a client config
   * @request GET:/client-config/info
   * @secure
   */
  clientConfigInfoWithGet = (
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<ClientConfig>, Error>({
      url: `/api/micro-main/v1/client-config/info`,
      method: 'GET',
      ...params
    });
}
