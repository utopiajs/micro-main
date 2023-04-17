import { useState } from 'react';

const useUser = () => {
  const [name, setName] = useState<string>('');
  return {
    name,
    setName
  };
};

export default useUser;
