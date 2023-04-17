import { theme } from 'antd';

const { useToken } = theme;

const useSiteToken = () => {
  const result = useToken();

  return {
    ...result
  };
};

export default useSiteToken;
