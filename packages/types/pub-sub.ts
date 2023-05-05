// 发布订阅

export interface IPubSubTypes {
  /** 更新 api loading */
  UPDATE_API_LOADING_STATUS: 'updateApiLoadingStatus';
  /** 获取 site theme */
  GET_SITE_THEME_VALUE: 'getSiteThemeValue';
  /** 更新 site config */
  UPDATE_SITE_THEME_CONFIG: 'updateSiteThemeConfig';
}

const PUB_SUB_TYPES: IPubSubTypes = {
  UPDATE_API_LOADING_STATUS: 'updateApiLoadingStatus',
  GET_SITE_THEME_VALUE: 'getSiteThemeValue',
  UPDATE_SITE_THEME_CONFIG: 'updateSiteThemeConfig'
};

export { PUB_SUB_TYPES };
