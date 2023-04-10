import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    console.log(1);
  }, []);

  return <div>home page</div>;
}
