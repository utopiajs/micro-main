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

import { AuthManage, AuthManageGroupOption, Error, PagingRes } from './data-contracts';
import { HttpClient, RequestParams, type ResponseCommonType } from './http-client';

export class AuthManages extends HttpClient {
  /**
   * No description
   *
   * @tags AuthManages
   * @name AuthManageCreateWithPost
   * @summary Create a auth record
   * @request POST:/auth-manage/create
   * @secure
   */
  authManageCreateWithPost = (
    data: {
      name: string;
      description?: string;
      code: string;
      apiUrl?: string;
      group: string;
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<AuthManage>, Error>({
      url: `/api/micro-main/v1/auth-manage/create`,
      method: 'POST',
      data: data,
      ...params
    });
  /**
   * No description
   *
   * @tags AuthManages
   * @name AuthManageListWithGet
   * @summary Get all auth manage list
   * @request GET:/auth-manage/list
   * @secure
   */
  authManageListWithGet = (
    query?: {
      /** name or description */
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
        data?: AuthManage[];
        paging?: PagingRes;
      }>,
      Error
    >({
      url: `/api/micro-main/v1/auth-manage/list`,
      method: 'GET',
      params: query,
      ...params
    });
  /**
   * No description
   *
   * @tags AuthManages
   * @name AuthManageUpdateWithPatch
   * @summary Update auth record
   * @request PATCH:/auth-manage/update
   * @secure
   */
  authManageUpdateWithPatch = (
    data: {
      name?: string;
      description?: string;
      group?: string;
      code?: string;
      apiUrl?: string;
      id?: string;
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<AuthManage>, Error>({
      url: `/api/micro-main/v1/auth-manage/update`,
      method: 'PATCH',
      data: data,
      ...params
    });
  /**
   * No description
   *
   * @tags AuthManages
   * @name AuthManageDeleteWithDelete
   * @summary Delete auth manage record(s)
   * @request DELETE:/auth-manage/delete
   * @secure
   */
  authManageDeleteWithDelete = (
    data: {
      ids?: string[];
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<void>, Error>({
      url: `/api/micro-main/v1/auth-manage/delete`,
      method: 'DELETE',
      data: data,
      ...params
    });
  /**
   * No description
   *
   * @tags AuthManages
   * @name AuthManageGroupOptionListWithGet
   * @summary Get auth manage group option list
   * @request GET:/auth-manage/group-option-list
   * @secure
   */
  authManageGroupOptionListWithGet = (
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<AuthManageGroupOption[]>, Error>({
      url: `/api/micro-main/v1/auth-manage/group-option-list`,
      method: 'GET',
      ...params
    });
}
