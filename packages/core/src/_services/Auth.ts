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

import { AuthTokens, Error, User } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Auth<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Auth
   * @name RegisterCreate
   * @summary Register as user
   * @request POST:/auth/register
   */
  registerCreate = (
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
    params: RequestParams = {}
  ) =>
    this.request<
      {
        user?: User;
        tokens?: AuthTokens;
      },
      Error
    >({
      path: `/auth/register`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Auth
   * @name LoginCreate
   * @summary Login
   * @request POST:/auth/login
   */
  loginCreate = (
    data: {
      /** @format email */
      email: string;
      /** @format password */
      password: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<
      {
        user?: User;
        tokens?: AuthTokens;
      },
      Error
    >({
      path: `/auth/login`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Auth
   * @name LogoutCreate
   * @summary Logout
   * @request POST:/auth/logout
   */
  logoutCreate = (
    data: {
      refreshToken: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<void, Error>({
      path: `/auth/logout`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Auth
   * @name RefreshTokensCreate
   * @summary Refresh auth tokens
   * @request POST:/auth/refresh-tokens
   */
  refreshTokensCreate = (
    data: {
      refreshToken: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<AuthTokens, Error>({
      path: `/auth/refresh-tokens`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * @description An email will be sent to reset password.
   *
   * @tags Auth
   * @name ForgotPasswordCreate
   * @summary Forgot password
   * @request POST:/auth/forgot-password
   */
  forgotPasswordCreate = (
    data: {
      /** @format email */
      email: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<void, Error>({
      path: `/auth/forgot-password`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Auth
   * @name ResetPasswordCreate
   * @summary Reset password
   * @request POST:/auth/reset-password
   */
  resetPasswordCreate = (
    query: {
      /** The reset password token */
      token: string;
    },
    data: {
      /**
       * At least one number and one letter
       * @format password
       * @minLength 8
       */
      password: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<void, Error>({
      path: `/auth/reset-password`,
      method: 'POST',
      query: query,
      body: data,
      type: ContentType.Json,
      ...params
    });
  /**
   * @description An email will be sent to verify email.
   *
   * @tags Auth
   * @name SendVerificationEmailCreate
   * @summary Send verification email
   * @request POST:/auth/send-verification-email
   * @secure
   */
  sendVerificationEmailCreate = (params: RequestParams = {}) =>
    this.request<void, Error>({
      path: `/auth/send-verification-email`,
      method: 'POST',
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Auth
   * @name VerifyEmailCreate
   * @summary verify email
   * @request POST:/auth/verify-email
   */
  verifyEmailCreate = (
    query: {
      /** The verify email token */
      token: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<void, Error>({
      path: `/auth/verify-email`,
      method: 'POST',
      query: query,
      ...params
    });
}
