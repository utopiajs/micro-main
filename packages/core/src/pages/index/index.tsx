import { getUserInfo } from '@/services/user';
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    getUserInfo('642016423654b518ede27a3a').then((res) => {
      console.log(res);
    });
  }, []);

  return <div>home page</div>;
}
