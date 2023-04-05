import { Users } from '@/_services/Users';
import { useEffect } from 'react';

const UserApi = new Users({});

export default function HomePage() {
  useEffect(() => {
    (async () => {
      const res = await UserApi.infoList({
        userId: '642016423654b518ede27a3a'
      });
      console.log('res', res);
    })();
  }, []);

  return <div>home page</div>;
}
