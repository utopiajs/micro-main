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

import { Error, User } from './data-contracts';
import { HttpClient, RequestParams, type ResponseCommonType } from './http-client';

export class Users extends HttpClient {
  /**
   * @description Logged in users can fetch only their own user information. Only admins can fetch other users.
   *
   * @tags Users
   * @name UsersInfoWithGet
   * @summary Get a user
   * @request GET:/users/info
   * @secure
   */
  usersInfoWithGet = (
    query: {
      /** User id */
      userId: string;
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<User>, Error>({
      url: `/api/micro-main/v1/users/info`,
      method: 'GET',
      params: query,
      ...params
    });
  /**
   * @description Only admins can create other users.
   *
   * @tags Users
   * @name UsersCreateWithPost
   * @summary Create a user
   * @request POST:/users/create
   * @secure
   */
  usersCreateWithPost = (
    data: {
      name: string;
      /**
       * must be unique
       * @format email
       */
      email: string;
      /**
       * At least one number and one letter
       * @format password
       * @minLength 8
       */
      password: string;
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<User>, Error>({
      url: `/api/micro-main/v1/users/create`,
      method: 'POST',
      data: data,
      ...params
    });
  /**
   * @description Only admins can retrieve all users.
   *
   * @tags Users
   * @name UsersListWithGet
   * @summary Get all users
   * @request GET:/users/list
   * @secure
   */
  usersListWithGet = (
    query?: {
      /** User name or email */
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
        data?: User[];
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
      url: `/api/micro-main/v1/users/list`,
      method: 'GET',
      params: query,
      ...params
    });
  /**
   * @description Logged in users can only update their own information. Only admins can update other users.
   *
   * @tags Users
   * @name UsersUpdateWithPatch
   * @summary Update a user
   * @request PATCH:/users/update
   * @secure
   */
  usersUpdateWithPatch = (
    data: {
      id?: string;
      name?: string;
      /**
       * must be unique
       * @format email
       */
      email?: string;
      /**
       * At least one number and one letter
       * @format password
       * @minLength 8
       */
      password?: string;
      preferenceSetting?: {
        theme?: 'light' | 'dark';
        colorPrimary?: string;
        borderRadius?: number;
      };
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<User>, Error>({
      url: `/api/micro-main/v1/users/update`,
      method: 'PATCH',
      data: data,
      ...params
    });
  /**
   * @description Logged in users can delete only themselves. Only admins can delete other users.
   *
   * @tags Users
   * @name UsersDeleteWithDelete
   * @summary Delete a user
   * @request DELETE:/users/delete
   * @secure
   */
  usersDeleteWithDelete = (
    data: {
      userIds?: string[];
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<void>, Error>({
      url: `/api/micro-main/v1/users/delete`,
      method: 'DELETE',
      data: data,
      ...params
    });
  /**
   * @description Only admins can retrieve all users.
   *
   * @tags Users
   * @name UsersInfoCheckWithGet
   * @request GET:/users/info-check
   * @secure
   */
  usersInfoCheckWithGet = (
    query: {
      type: string;
      name?: string;
      email?: string;
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<
      ResponseCommonType<{
        isTaken: boolean;
        type: 'name' | 'email';
      }>,
      Error
    >({
      url: `/api/micro-main/v1/users/info-check`,
      method: 'GET',
      params: query,
      ...params
    });
}
