import { NotFound } from '@utopia/core-component';
import Styles from './index.less';

const NotFoundPage = () => {
  return (
    <div className={Styles['not-found-page']}>
      <NotFound />
    </div>
  );
};

export default NotFoundPage;
