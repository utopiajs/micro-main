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

import { Error, Menu, MenuOrigin, MenuTreeNode } from './data-contracts';
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
    data: MenuOrigin,
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
    data: MenuOrigin,
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
    this.request<ResponseCommonType<MenuTreeNode[]>, Error>({
      url: `/api/micro-main/v1/menu/tree`,
      method: 'GET',
      params: query,
      ...params
    });
  /**
   * No description
   *
   * @tags Menus
   * @name MenuUserTreeWithGet
   * @summary get menu tree with authority
   * @request GET:/menu/user-tree
   * @secure
   */
  menuUserTreeWithGet = (
    query?: {
      /** menu name */
      search?: string;
      /** 查找当级数型结构 */
      parentId?: string;
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<MenuTreeNode[]>, Error>({
      url: `/api/micro-main/v1/menu/user-tree`,
      method: 'GET',
      params: query,
      ...params
    });
  /**
   * No description
   *
   * @tags Menus
   * @name MenuListWithGet
   * @summary get menu list
   * @request GET:/menu/list
   * @secure
   */
  menuListWithGet = (
    query?: {
      /** menu name */
      search?: string;
      /** 查找当级数型结构 */
      parentId?: string;
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<Menu[]>, Error>({
      url: `/api/micro-main/v1/menu/list`,
      method: 'GET',
      params: query,
      ...params
    });
  /**
   * @description delete a menu.
   *
   * @tags Menus
   * @name MenuDeleteWithDelete
   * @summary delete a menu
   * @request DELETE:/menu/delete
   * @secure
   */
  menuDeleteWithDelete = (
    data: {
      id?: string;
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<void>, Error>({
      url: `/api/micro-main/v1/menu/delete`,
      method: 'DELETE',
      data: data,
      ...params
    });
  /**
   * No description
   *
   * @tags Menus
   * @name MenuNodeMoveWithPost
   * @summary move menu node
   * @request POST:/menu/nodeMove
   * @secure
   */
  menuNodeMoveWithPost = (
    data: {
      dragNode: Menu;
      prevNode?: Menu;
      targetNode?: Menu;
      dropPosition: number;
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<void>, Error>({
      url: `/api/micro-main/v1/menu/nodeMove`,
      method: 'POST',
      data: data,
      ...params
    });
}
