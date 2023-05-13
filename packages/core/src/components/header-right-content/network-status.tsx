// api laoding status
import { PUB_SUB_TYPES } from '@utopia/micro-types';
import { useEffect, useState } from 'react';
import loadingSvg from './api-loading.svg';
import Styles from './index.less';

const NetworkStatus = () => {
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    window._MICRO_MAIN_CORE_PUB_SUB_.subscribe(
      PUB_SUB_TYPES.UPDATE_API_LOADING_STATUS,
      (paylod) => {
        setApiLoading(paylod.loading);
      }
    );
  }, []);
  return (
    <div className={Styles['network-status-wrap']}>
      {apiLoading && <img className="loading" src={loadingSvg} alt="" />}
    </div>
  );
};

export default NetworkStatus;
