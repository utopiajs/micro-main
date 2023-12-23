// 根据全局 initialState，获取 antd Provider Config themm 配置
import { type IInitialState } from '@utopia/micro-types';
import { useEffect, useRef, useState } from 'react';
import { getAntdConfigProviderTheme } from '@/utils';

const useAntdProviderConfigTheme = (initialState: IInitialState) => {
  const [siteAntdThemeConfig, setSiteAntdThemeConfig] = useState(
    getAntdConfigProviderTheme(initialState.siteThemeConfig)
  );
  const firstRenderMarkRef = useRef(true);

  useEffect(() => {
    if (!firstRenderMarkRef.current) {
      setSiteAntdThemeConfig(
        getAntdConfigProviderTheme(initialState.siteThemeConfig)
      );
    }
    firstRenderMarkRef.current = false;
  }, [initialState]);

  return { siteAntdThemeConfig };
};

export default useAntdProviderConfigTheme;
