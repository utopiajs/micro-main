import { InfoCircleOutlined } from '@ant-design/icons';
import { CoreModal } from '@utopia/core-component';
import { formItemLargeLayout, useSiteToken } from '@utopia/micro-main-utils';
import { Col, Form, Typography } from 'antd';
import React, { useCallback, useState } from 'react';
import Styles from './index.less';

const ClientInfo: React.FC = () => {
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
          <img
            alt=""
            className="logo"
            src="http://10.209.8.44:11127/sso/themes/unisinsight/images/logo.png"
          />
          <div style={{ textAlign: 'left' }}>
            <Typography.Title level={4}>紫光华智</Typography.Title>
            <Typography.Text
              className="description"
              style={{ color: colorTextSecondary }}
            >
              专注于数智视觉产品和解决方案的研发、生产、销售和服务
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
              <Form.Item label="平台版本">1.0.0(R)</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="发布日期">2023-08-28 17:10:57</Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="平台官网">
                <Typography.Link
                  target="_blank"
                  href="https://www.unisinsight.com/"
                >
                  https://unisinsight.com/
                </Typography.Link>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系我们">kf@unisinsight.com</Form.Item>
            </Col>
          </Form>
        </div>
        <div
          className="copyright-footer"
          style={{ backgroundColor: colorBgTextHover }}
        >
          copyright @ 2022 重庆紫光华山智安科技有限公司及其许可者
          版权所有，保留一切权利
        </div>
      </CoreModal>
    </div>
  );
};

export default ClientInfo;
