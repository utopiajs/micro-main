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

import { Error, Menu, Role, RoleMappingModules, User } from './data-contracts';
import { HttpClient, RequestParams, type ResponseCommonType } from './http-client';

export class Roles extends HttpClient {
  /**
   * @description Only admins can create a role.
   *
   * @tags Roles
   * @name RoleCreateWithPost
   * @summary Create a role
   * @request POST:/role/create
   * @secure
   */
  roleCreateWithPost = (
    data: {
      name: string;
      description?: string;
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<Role>, Error>({
      url: `/api/micro-main/v1/role/create`,
      method: 'POST',
      data: data,
      ...params
    });
  /**
   * @description Only admins can getet all roles.
   *
   * @tags Roles
   * @name RoleListWithGet
   * @summary Get all roles
   * @request GET:/role/list
   * @secure
   */
  roleListWithGet = (
    query?: {
      /** role name or description */
      search?: string;
      /** sort by query in the form of field:desc/asc (ex. name:asc) */
      sortBy?: string;
      /**
       * page size
       * @min 1
       * @default 10
       */
      pageSize?: number;
      /**
       * Page number
       * @min 1
       * @default 1
       */
      pageNum?: number;
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<
      ResponseCommonType<{
        data?: Role[];
        paging?: {
          /** @example 1 */
          pageSize?: number;
          /** @example 10 */
          pageNum?: number;
          /** @example 1 */
          total?: number;
        };
      }>,
      Error
    >({
      url: `/api/micro-main/v1/role/list`,
      method: 'GET',
      params: query,
      ...params
    });
  /**
   * @description Only admins can update roles.
   *
   * @tags Roles
   * @name RoleUpdateWithPatch
   * @summary Update a role
   * @request PATCH:/role/update
   * @secure
   */
  roleUpdateWithPatch = (
    data: {
      name?: string;
      description?: string;
      roleId?: string;
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<Role>, Error>({
      url: `/api/micro-main/v1/role/update`,
      method: 'PATCH',
      data: data,
      ...params
    });
  /**
   * @description Only admins can delete a role or roles.
   *
   * @tags Roles
   * @name RoleDeleteWithDelete
   * @summary Delete a role
   * @request DELETE:/role/delete
   * @secure
   */
  roleDeleteWithDelete = (
    data: {
      roleIds?: string[];
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<void>, Error>({
      url: `/api/micro-main/v1/role/delete`,
      method: 'DELETE',
      data: data,
      ...params
    });
  /**
   * @description Role mapping user
   *
   * @tags Roles
   * @name RoleMappingModuleWithPost
   * @summary Role mapping user
   * @request POST:/role/mapping-module
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
    this.request<ResponseCommonType<RoleMappingModules>, Error>({
      url: `/api/micro-main/v1/role/mapping-module`,
      method: 'POST',
      data: data,
      ...params
    });
  /**
   * @description Get the user under the current role
   *
   * @tags Roles
   * @name RoleMappingModuleInfoWithGet
   * @summary get users
   * @request GET:/role/mapping-module-info
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
        userList?: User[];
        menuList?: Menu[];
      }>,
      Error
    >({
      url: `/api/micro-main/v1/role/mapping-module-info`,
      method: 'GET',
      params: query,
      ...params
    });
}
