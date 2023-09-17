import { Typography } from 'antd';
import trexIcon from '../../assets/images/trex-icon.png';
import { COMPONENT_CLASSNAME_PREFIX } from '../../constants/component';
import './index.less';

const prefixCls = `${COMPONENT_CLASSNAME_PREFIX}-not-found`;

const NotFoundPage = () => {
  return (
    <div className={prefixCls}>
      <img src={trexIcon} alt="" width={100} />
      <div className="main-message">
        <Typography.Title level={4}>
          未找到该页面，可能原因如下：
        </Typography.Title>
        <ul className="suggestions-summary-list">
          <li>
            <Typography.Text>平台中不存在该页面模块</Typography.Text>
          </li>
          <li>
            <Typography.Text>暂无权限访问该模块</Typography.Text>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotFoundPage;
