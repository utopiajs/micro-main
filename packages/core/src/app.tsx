import { DEFAULT_QIANKUN_GLOBAL_STATE, siteThemeConfig } from '@/constants';
import { coreClientConfig, coreMenuApi, coreUserApi } from '@/services';
import type { AntdConfig, RuntimeAntdConfig } from '@umijs/max';
import { history, useModel } from '@umijs/max';
import {
  convertArrayFromTree,
  getQueryParams,
  isApiSuccess,
  PublishSubscribe,
  ROUTE_CORE_IFRAME_SRC,
  ROUTE_CORE_NOT_FOUND,
  ROUTE_LOGIN_PATH,
  ROUTE_REGISTER_PATH,
  _Cookies
} from '@utopia/micro-main-utils';
import type {
  IInitialState,
  MenuTreeNode,
  QiankunStateFromMasterProps,
  User
} from '@utopia/micro-types';
import type { ThemeConfig } from 'antd';
import { theme } from 'antd';
import { useCallback, useEffect, useState } from 'react';

const PREFERS_LS_KEY = 'micro-main:user-prefers';
const { redirectUrl = '/' } = getQueryParams();
const _MICRO_MAIN_CORE_PUB_SUB_ = new PublishSubscribe();

// 保存一份用户菜单列表，用于权限控制
let _menuConfigUserList: MenuTreeNode[] = [];

export const qiankun = {
  apps: [
    {
      name: 'user-center',
      entry: '/user-center-entry/',
      activeRule: '/user-center'
    }
  ]
};

export const antd: RuntimeAntdConfig = (memo: AntdConfig) => {
  const nextTheme: ThemeConfig = {
    algorithm: theme.defaultAlgorithm
  };
  memo.theme = nextTheme;
  return memo;
};

export async function getInitialState(): Promise<IInitialState> {
  const { location } = history;
  const fetchUserInfo = async () => {
    const userId = _Cookies.get('id');
    const { errorCode, data } = await coreUserApi.usersInfoWithGet(
      { userId },
      { showErrorMessage: false, showApiLoadingStatus: false }
    );
    if (isApiSuccess(errorCode)) {
      // 保留用于值，使全局样式跟随用户设置
      localStorage.setItem(
        PREFERS_LS_KEY,
        JSON.stringify(data.preferenceSetting)
      );
      if (location.pathname === ROUTE_LOGIN_PATH) {
        window.location.href = redirectUrl;
      }
      return data;
    }

    const userPrefers: User['preferenceSetting'] = JSON.parse(
      localStorage.getItem(PREFERS_LS_KEY) || '{}'
    );
    if (![ROUTE_LOGIN_PATH, ROUTE_REGISTER_PATH].includes(location.pathname)) {
      if (redirectUrl.indexOf(ROUTE_LOGIN_PATH) > -1) {
        history.push(`${ROUTE_LOGIN_PATH}`);
      } else {
        history.push(`${ROUTE_LOGIN_PATH}?redirectUrl=${location.pathname}`);
      }
    }
    return {
      id: '',
      preferenceSetting: userPrefers.colorPrimary
        ? userPrefers
        : siteThemeConfig
    };
  };

  const getMenuConfigUserTree = async () => {
    const { errorCode, data } = await coreMenuApi.menuUserTreeWithGet(
      {},
      { showErrorMessage: false }
    );
    if (isApiSuccess(errorCode)) {
      return data;
    }
    return [];
  };

  // 获取平台相关信息
  const getClientConfig = async () => {
    const { errorCode, data } = await coreClientConfig.clientConfigInfoWithGet({
      showErrorMessage: false
    });
    if (isApiSuccess(errorCode)) {
      return data;
    }
    return {};
  };

  const currentUser = await fetchUserInfo();
  const menuConfigUserTree = await getMenuConfigUserTree();
  const clientConfig = await getClientConfig();

  // 转换为数组结构，便于比较
  _menuConfigUserList = convertArrayFromTree(menuConfigUserTree);
  return {
    currentUser,
    menuConfigUserTree,
    siteThemeConfig: currentUser.preferenceSetting,
    clientConfig
  };
}

/**
 * qiankun global data
 * setQiankunGlobalState: 更新全局初始化，避免修改主题或者用户信息后需刷新页面才能生效（优化交互）
 */
export const useQiankunStateForSlave = (): QiankunStateFromMasterProps => {
  const { initialState: initialModelState } = useModel('@@initialState');

  const getSiteState = useCallback(() => {
    return {
      currentUser:
        initialModelState?.currentUser ??
        DEFAULT_QIANKUN_GLOBAL_STATE.currentUser,
      clientConfig:
        initialModelState?.clientConfig ??
        DEFAULT_QIANKUN_GLOBAL_STATE.clientConfig,
      siteThemeConfig:
        initialModelState?.siteThemeConfig ??
        DEFAULT_QIANKUN_GLOBAL_STATE.siteThemeConfig,
      menuConfigUserTree:
        initialModelState?.menuConfigUserTree ??
        DEFAULT_QIANKUN_GLOBAL_STATE.menuConfigUserTree
    };
  }, [initialModelState]);

  const [qiankunGlobalState, setQiankunGlobalState] = useState(getSiteState());

  useEffect(() => {
    setQiankunGlobalState(getSiteState());
  }, [getSiteState]);

  return {
    qiankunGlobalState,
    setQiankunGlobalState
  };
};

export function onRouteChange({ location }) {
  const { pathname } = location;
  // 兼容动态路由
  if (
    _menuConfigUserList.filter((item) => item.url === pathname).length < 1 &&
    !pathname.startsWith(ROUTE_CORE_IFRAME_SRC) &&
    ![ROUTE_LOGIN_PATH, ROUTE_REGISTER_PATH, ROUTE_CORE_NOT_FOUND].includes(
      pathname
    )
  ) {
    history.push('/404');
  }
}

// registe PublishSubscribe
window._MICRO_MAIN_CORE_PUB_SUB_ = _MICRO_MAIN_CORE_PUB_SUB_;
