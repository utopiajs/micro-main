// 功能菜单赛选穿梭框

import { CoreModal } from '@/components';
import type { ModalProps } from 'antd';
import { forwardRef } from 'react';
import type { RefMenuTransferBaseProps } from './base-panel';
import MenuTransferBase from './base-panel';

interface MenuTransferProps extends ModalProps {
  renderType?: 'base' | 'modal';
}

const MenuTransfer = forwardRef<RefMenuTransferBaseProps, MenuTransferProps>(
  (props, ref) => {
    const { renderType = 'base', ...restProps } = props;

    return renderType === 'base' ? (
      <MenuTransferBase />
    ) : (
      <CoreModal title="功能模块选择" width={800} {...restProps}>
        <MenuTransferBase ref={ref} />
      </CoreModal>
    );
  }
);

export default MenuTransfer;
