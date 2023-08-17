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

import { Error, Menu, MenuTreeNode } from './data-contracts';
import { HttpClient, RequestParams, type ResponseCommonType } from './http-client';

export class Menus extends HttpClient {
  /**
   * @description Only admins can create a menu.
   *
   * @tags Menus
   * @name MenuCreateWithPost
   * @summary Create a menu
   * @request POST:/menu/create
   * @secure
   */
  menuCreateWithPost = (
    data: any,
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<Menu>, Error>({
      url: `/api/micro-main/v1/menu/create`,
      method: 'POST',
      data: data,
      ...params
    });
  /**
   * @description Only admins can update a menu.
   *
   * @tags Menus
   * @name MenuUpdateWithPost
   * @summary update a menu
   * @request POST:/menu/update
   * @secure
   */
  menuUpdateWithPost = (
    data: any,
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<Menu>, Error>({
      url: `/api/micro-main/v1/menu/update`,
      method: 'POST',
      data: data,
      ...params
    });
  /**
   * No description
   *
   * @tags Menus
   * @name MenuTreeWithGet
   * @summary get menu tree
   * @request GET:/menu/tree
   * @secure
   */
  menuTreeWithGet = (
    query?: {
      /** menu name */
      search?: string;
      /** 查找当级数型结构 */
      parentId?: string;
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<MenuTreeNode>, Error>({
      url: `/api/micro-main/v1/menu/tree`,
      method: 'GET',
      params: query,
      ...params
    });
}
