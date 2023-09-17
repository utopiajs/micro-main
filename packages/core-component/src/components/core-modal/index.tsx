// 基于 ant modal 定制封装

import { CloseOutlined } from '@ant-design/icons';
import { useHoverStyle, useSiteToken } from '@utopia/micro-main-utils';
import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { COMPONENT_CLASSNAME_PREFIX } from '../../constants/component';

import './index.less';

interface CoreModalProps extends ModalProps {
  height?: number;
}

const prefixCls = COMPONENT_CLASSNAME_PREFIX;

const CoreModal: React.FC<CoreModalProps> = (props) => {
  const {
    title,
    children,
    className,
    height,
    closable = true,
    onCancel,
    ...restProps
  } = props;
  const {
    token: { paddingXS, colorBorderSecondary, colorBgTextHover }
  } = useSiteToken();

  useHoverStyle(
    `.${prefixCls}-core-modal-close-icon`,
    {},
    { backgroundColor: colorBgTextHover }
  );
  const handleCancel = useCallback(
    (e) => {
      if (onCancel) {
        onCancel(e);
      }
    },
    [onCancel]
  );

  return (
    <Modal
      title={false}
      closable={false}
      onCancel={handleCancel}
      {...restProps}
      className={classNames([className, `${prefixCls}-core-modal`])}
    >
      {closable && (
        <div
          className={`${prefixCls}-core-modal-close-icon`}
          title="关闭弹窗"
          onClick={handleCancel}
        >
          <CloseOutlined />
        </div>
      )}
      {title ? (
        <div
          className={`${prefixCls}-core-modal-header`}
          style={{ padding: paddingXS, borderColor: colorBorderSecondary }}
        >
          {title}
        </div>
      ) : null}
      <div
        className={`${prefixCls}-core-modal-body`}
        style={{ height, padding: paddingXS }}
      >
        {children}
      </div>
    </Modal>
  );
};

export default CoreModal;
