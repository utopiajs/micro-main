// api laoding status
import loadingSvg from './api-loading.svg';
import Styles from './index.less';

const NetworkStatus = () => {
  return (
    <div className={Styles['network-status-wrap']}>
      <img className="loading" src={loadingSvg} alt="" />
    </div>
  );
};

export default NetworkStatus;
