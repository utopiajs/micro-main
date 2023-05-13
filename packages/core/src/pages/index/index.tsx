import { coreUserApi } from '@/services';
import { _Cookies } from '@utopia/micro-main-utils';
import { Button } from 'antd';
import { useCallback } from 'react';

export default function HomePage() {
  const handleGetUserInfo = useCallback(() => {
    coreUserApi.usersInfoWithGet({ userId: _Cookies.get('id') });
  }, []);

  return (
    <div>
      <Button onClick={handleGetUserInfo}> get user info</Button>
    </div>
  );
}
