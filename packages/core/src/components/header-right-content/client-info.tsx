import { InfoCircleOutlined } from '@ant-design/icons';
import { CoreModal } from '@utopia/core-component';
import {
  formateTime,
  formItemLargeLayout,
  useSiteToken
} from '@utopia/micro-main-utils';
import type { IInitialState } from '@utopia/micro-types';
import { Col, Form, Typography } from 'antd';
import React, { useCallback, useState } from 'react';
import Styles from './index.less';

interface IProps {
  initialState?: IInitialState;
}

const ClientInfo: React.FC<IProps> = (props) => {
  const {
    initialState: {
      clientConfig: {
        name,
        logo,
        version,
        deployTime,
        description,
        copyright,
        siteUrl,
        contact
      }
    } = { clientConfig: {} }
  } = props;

  const [openClientInfoModal, setOpenClientInfoModal] = useState(false);
  const {
    token: { colorTextSecondary, colorBorder, colorBgTextHover }
  } = useSiteToken();

  const showClientInfoModal = useCallback(() => {
    setOpenClientInfoModal(true);
  }, []);

  const shandleClientInfoModalCancel = useCallback(() => {
    setOpenClientInfoModal(false);
  }, []);

  return (
    <div className={Styles['client-info-wrap']}>
      <InfoCircleOutlined
        title="关于平台"
        onClick={() => {
          showClientInfoModal();
        }}
      />
      <CoreModal
        open={openClientInfoModal}
        title="关于平台"
        className={Styles['client-info-modal']}
        onCancel={shandleClientInfoModalCancel}
        footer={null}
      >
        <div className="header-content">
          <img alt="" className="logo" src={logo} />
          <div style={{ textAlign: 'left' }}>
            <Typography.Title level={4}>{name}</Typography.Title>
            <Typography.Text
              className="description"
              style={{ color: colorTextSecondary }}
            >
              {description}
            </Typography.Text>
          </div>
        </div>
        <div className="body-content" style={{ borderColor: colorBorder }}>
          <Form
            className="ant-form-text-small"
            layout="inline"
            {...formItemLargeLayout}
          >
            <Col span={12}>
              <Form.Item label="平台版本">{version}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="发布日期">{formateTime(deployTime)}</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="平台官网">
                <Typography.Link target="_blank" href={siteUrl}>
                  {siteUrl}
                </Typography.Link>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系我们">{contact}</Form.Item>
            </Col>
          </Form>
        </div>
        <div
          className="copyright-footer"
          style={{ backgroundColor: colorBgTextHover }}
        >
          {copyright}
        </div>
      </CoreModal>
    </div>
  );
};

export default ClientInfo;
