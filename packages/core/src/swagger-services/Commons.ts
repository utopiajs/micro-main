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

import { BingImg, Error, UploadRes } from './data-contracts';
import { HttpClient, RequestParams, type ResponseCommonType } from './http-client';

export class Commons extends HttpClient {
  /**
   * No description
   *
   * @tags Commons
   * @name CommonStaticBingImgWithGet
   * @summary Get bing wallpaper
   * @request GET:/common/static/bing-img
   * @secure
   */
  commonStaticBingImgWithGet = (
    query?: {
      /** 表示请求的天数序列,0代表今天、1代表昨天…以此类推(只支持最近7天)，默认为0，范围0-7 */
      dayIndex?: number;
      /** 请求的天数数量，默认为1，范围1-8 */
      days?: number;
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<BingImg[]>, Error>({
      url: `/api/micro-main/v1/common/static/bing-img`,
      method: 'GET',
      params: query,
      ...params
    });
  /**
   * No description
   *
   * @tags Commons
   * @name CommonUploadAvatarWithPost
   * @summary 头像上传接口
   * @request POST:/common/upload/avatar
   * @secure
   */
  commonUploadAvatarWithPost = (
    data: {
      /** @format binary */
      file: File;
    },
    params: RequestParams = { showErrorMessage: true, showSuccessMessage: false, showApiLoadingStatus: true }
  ) =>
    this.request<ResponseCommonType<UploadRes>, void>({
      url: `/api/micro-main/v1/common/upload/avatar`,
      method: 'POST',
      data: data,
      ...params
    });
}
