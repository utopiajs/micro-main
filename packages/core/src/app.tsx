import {
  clientConstantProps,
  DEFAULT_USER_INFO,
  siteThemeConfig
} from '@/constants';
import { coreUserApi } from '@/services';
import {
  history,
  useModel,
  type AntdConfig,
  type RuntimeAntdConfig
} from '@umijs/max';
import {
  getQueryParams,
  isApiSuccess,
  PublishSubscribe,
  _Cookies
} from '@utopia/micro-main-utils';
import { User, type IInitialState } from '@utopia/micro-types';
import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

const loginPath = '/user-center/login';
const PREFERS_LS_KEY = 'micro-main:user-prefers';
const { redirectUrl = '/' } = getQueryParams();
const _MICRO_MAIN_CORE_PUB_SUB_ = new PublishSubscribe();

export const qiankun = {
  apps: [
    {
      name: 'user-center',
      entry: '//localhost:9001'
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
      if (location.pathname === loginPath) {
        window.location.href = redirectUrl;
      }
      return data;
    }

    const userPrefers: User['preferenceSetting'] = JSON.parse(
      localStorage.getItem(PREFERS_LS_KEY) || '{}'
    );
    history.push(loginPath);
    return {
      id: '',
      preferenceSetting: userPrefers.colorPrimary
        ? userPrefers
        : siteThemeConfig
    };
  };

  const currentUser = await fetchUserInfo();

  return {
    currentUser,
    siteThemeConfig: currentUser.preferenceSetting,
    client: clientConstantProps
  };
}

// qiankun global data
export const useQiankunStateForSlave = (): { initialState: IInitialState } => {
  const { initialState } = useModel('@@initialState');

  return {
    initialState: {
      currentUser: initialState?.currentUser || DEFAULT_USER_INFO,
      client: initialState?.client || {},
      siteThemeConfig: initialState?.siteThemeConfig || {}
    }
  };
};

// registe PublishSubscribe
window._MICRO_MAIN_CORE_PUB_SUB_ = _MICRO_MAIN_CORE_PUB_SUB_;
