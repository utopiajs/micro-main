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

import { Error, Menu, User } from './data-contracts';
import { HttpClient, RequestParams, type ResponseCommonType } from './http-client';

export class RoleMappingModules extends HttpClient {
  /**
   * @description Role mapping user
   *
   * @tags RoleMappingModules
   * @name RoleMappingModuleWithPost
   * @summary Role mapping user
   * @request POST:/role-mapping/module
   * @secure
   */
  roleMappingModuleWithPost = (
    data: {
      roleId: string;
      userIds?: string[];
      menuIds?: string[];
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<void>, Error>({
      url: `/api/micro-main/v1/role-mapping/module`,
      method: 'POST',
      data: data,
      ...params
    });
  /**
   * @description Get the user under the current role
   *
   * @tags RoleMappingModules
   * @name RoleMappingModuleInfoWithGet
   * @summary get users
   * @request GET:/role-mapping/module-info
   * @secure
   */
  roleMappingModuleInfoWithGet = (
    query?: {
      /** role id */
      roleId?: string;
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<
      ResponseCommonType<{
        userList: User[];
        menuList: Menu[];
      }>,
      Error
    >({
      url: `/api/micro-main/v1/role-mapping/module-info`,
      method: 'GET',
      params: query,
      ...params
    });
}
