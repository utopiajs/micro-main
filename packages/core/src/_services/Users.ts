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
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Users<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Logged in users can fetch only their own user information. Only admins can fetch other users.
   *
   * @tags Users
   * @name InfoList
   * @summary Get a user
   * @request GET:/users/info
   * @secure
   */
  infoList = (
    query: {
      /** User id */
      userId: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<User, any>({
      path: `/users/info`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   * @description Only admins can create other users.
   *
   * @tags Users
   * @name CreateCreate
   * @summary Create a user
   * @request POST:/users/create
   * @secure
   */
  createCreate = (
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
      role: 'user' | 'admin';
    },
    params: RequestParams = {}
  ) =>
    this.request<void, Error>({
      path: `/users/create`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * @description Only admins can retrieve all users.
   *
   * @tags Users
   * @name ListList
   * @summary Get all users
   * @request GET:/users/list
   * @secure
   */
  listList = (
    query?: {
      /** User name */
      name?: string;
      /** User role */
      role?: string;
      /** sort by query in the form of field:desc/asc (ex. name:asc) */
      sortBy?: string;
      /**
       * Maximum number of users
       * @min 1
       * @default 10
       */
      limit?: number;
      /**
       * Page number
       * @min 1
       * @default 1
       */
      page?: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<
      {
        results?: User[];
        /** @example 1 */
        page?: number;
        /** @example 10 */
        limit?: number;
        /** @example 1 */
        totalPages?: number;
        /** @example 1 */
        totalResults?: number;
      },
      Error
    >({
      path: `/users/list`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   * @description Logged in users can only update their own information. Only admins can update other users.
   *
   * @tags Users
   * @name UpdatePartialUpdate
   * @summary Update a user
   * @request PATCH:/users/update
   * @secure
   */
  updatePartialUpdate = (
    data: {
      /** User id */
      userId?: string;
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
    },
    params: RequestParams = {}
  ) =>
    this.request<User, Error>({
      path: `/users/update`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * @description Logged in users can delete only themselves. Only admins can delete other users.
   *
   * @tags Users
   * @name DeleteDelete
   * @summary Delete a user
   * @request DELETE:/users/delete
   * @secure
   */
  deleteDelete = (
    data: {
      /** User id */
      userId?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<void, Error>({
      path: `/users/delete`,
      method: 'DELETE',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
}
