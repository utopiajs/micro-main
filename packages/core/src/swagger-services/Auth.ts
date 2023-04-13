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
import { HttpClient, RequestParams } from './http-client';

export class Auth extends HttpClient {
  /**
   * No description
   *
   * @tags Auth
   * @name AuthRegisterWithPost
   * @summary Register as user
   * @request POST:/auth/register
   */
  authRegisterWithPost = (
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
      url: `/api/micro-main/v1/auth/register`,
      method: 'POST',
      data: data,
      ...params
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthLoginWithPost
   * @summary User Login
   * @request POST:/auth/login
   */
  authLoginWithPost = (
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
      url: `/api/micro-main/v1/auth/login`,
      method: 'POST',
      data: data,
      ...params
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthLogoutWithPost
   * @summary User Logout
   * @request POST:/auth/logout
   */
  authLogoutWithPost = (
    data: {
      refreshToken: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<void, Error>({
      url: `/api/micro-main/v1/auth/logout`,
      method: 'POST',
      data: data,
      ...params
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthRefreshTokensWithPost
   * @summary Refresh auth tokens
   * @request POST:/auth/refresh-tokens
   */
  authRefreshTokensWithPost = (
    data: {
      refreshToken: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<void, Error>({
      url: `/api/micro-main/v1/auth/refresh-tokens`,
      method: 'POST',
      data: data,
      ...params
    });
  /**
   * @description An email will be sent to reset password.
   *
   * @tags Auth
   * @name AuthForgotPasswordWithPost
   * @summary Forgot password
   * @request POST:/auth/forgot-password
   */
  authForgotPasswordWithPost = (
    data: {
      /** @format email */
      email: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<void, Error>({
      url: `/api/micro-main/v1/auth/forgot-password`,
      method: 'POST',
      data: data,
      ...params
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthResetPasswordWithPost
   * @summary Reset password
   * @request POST:/auth/reset-password
   */
  authResetPasswordWithPost = (
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
      url: `/api/micro-main/v1/auth/reset-password`,
      method: 'POST',
      params: query,
      data: data,
      ...params
    });
  /**
   * @description An email will be sent to verify email.
   *
   * @tags Auth
   * @name AuthSendVerificationEmailWithPost
   * @summary Send verification email
   * @request POST:/auth/send-verification-email
   * @secure
   */
  authSendVerificationEmailWithPost = (params: RequestParams = {}) =>
    this.request<void, Error>({
      url: `/api/micro-main/v1/auth/send-verification-email`,
      method: 'POST',
      ...params
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthVerifyEmailWithPost
   * @summary verify email
   * @request POST:/auth/verify-email
   */
  authVerifyEmailWithPost = (
    query: {
      /** The verify email token */
      token: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<void, Error>({
      url: `/api/micro-main/v1/auth/verify-email`,
      method: 'POST',
      params: query,
      ...params
    });
}
