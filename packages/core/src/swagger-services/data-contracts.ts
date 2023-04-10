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

/** @example {"id":"5ebac534954b54139806c112","email":"fake@example.com","name":"fake name","role":"user"} */
export interface User {
  id?: string;
  /** @format email */
  email?: string;
  name?: string;
  role?: 'user' | 'admin';
}

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

export interface Error {
  code?: number;
  message?: string;
}
