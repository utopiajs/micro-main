// 功能菜单赛选穿梭框

import { CoreModal } from '@utopia/core-component';
import type { ModalProps } from 'antd';
import { forwardRef } from 'react';
import type {
  MenuTransferBaseProps,
  RefMenuTransferBaseProps
} from './base-panel';
import MenuTransferBase from './base-panel';

interface MenuTransferProps extends ModalProps, MenuTransferBaseProps {
  renderType?: 'base' | 'modal';
}

const MenuTransfer = forwardRef<RefMenuTransferBaseProps, MenuTransferProps>(
  (props, ref) => {
    const { renderType = 'base', defaultValue, ...restProps } = props;

    return renderType === 'base' ? (
      <MenuTransferBase defaultValue={defaultValue} />
    ) : (
      <CoreModal title="功能模块选择" width={800} {...restProps}>
        <MenuTransferBase defaultValue={defaultValue} ref={ref} />
      </CoreModal>
    );
  }
);

export default MenuTransfer;
