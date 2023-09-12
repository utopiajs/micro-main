import { useParams } from '@umijs/max';
import React from 'react';
import './index.less';

const MicroMainIframePage: React.FC = () => {
  const params = useParams();
  return (
    <div className="micro-main-core-iframe-wrap">
      <iframe
        title="micro-main-iframe"
        src={params.iframeSrc}
        height="100%"
        width="100%"
        style={{ border: 0, overflow: 'hidden' }}
      />
    </div>
  );
};

export default MicroMainIframePage;
