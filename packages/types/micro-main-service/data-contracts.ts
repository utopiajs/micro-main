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

/** @example {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg","expires":"2020-05-12T16:18:04.793Z"} */
export interface Token {
  token?: string;
  /** @format date-time */
  expires?: string;
}

export interface AuthTokens {
  access?: Token;
  refresh?: Token;
}

export interface MenuOrigin {
  id: string;
  name: string;
  url: string;
  code: string;
  parentId: string;
  parentName: string;
  displayOrder: number;
  icon: string;
  menuLevel: number;
  isShow: boolean;
  showHeader: boolean;
  showSidebar: boolean;
  redirectUrl: string;
}

export interface MenuTime {
  createdTime?: string;
  updatedTime?: string;
}

export type Menu = MenuOrigin & MenuTime;

export type MenuTreeNode = Menu & {
  children?: MenuTreeNode[];
};

export interface Error {
  code?: number;
  message?: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  createdTime: number;
  createBy: string;
  updatedTime: number;
}

export interface RoleMappingModules {
  roleId: string;
  userIds: string[];
  menuIds?: string[];
  createdTime: number;
  updatedTime: number;
}

export interface RoleOption {
  id: string;
  name: string;
  description: string;
}

/** @example {"id":"5ebac534954b54139806c112","email":"fake@example.com","name":"fake name","role":"user","preferenceSetting":{"theme":"light","colorPrimary":"#1677ff","borderRadius":6}} */
export interface User {
  id: string;
  /** @format email */
  email?: string;
  name?: string;
  avatar?: string;
  roleList?: RoleOption[];
  role?: 'user' | 'admin';
  preferenceSetting: {
    theme: 'light' | 'dark';
    colorPrimary: string;
    borderRadius: number;
  };
}

export interface BingImg {
  startdate?: string;
  fullstartdate?: string;
  enddate?: string;
  url?: string;
  urlbase?: string;
  copyright?: string;
  copyrightlink?: string;
  quiz?: string;
  wp?: string;
}

/** @example {"url":"qiniu-cdn.utopiajs.space/avatar/61ba31c5-bcba-43b8-b399-28e31f8530fb","size":6108} */
export interface UploadRes {
  url?: string;
  size?: number;
}
