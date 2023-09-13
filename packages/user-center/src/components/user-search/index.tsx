// 用户搜索
import { CoreModal } from '@/components';
import type { ModalProps } from 'antd';
import { forwardRef } from 'react';
import type { RefUserSearchBaseProps, UserSearchBaseProps } from './base-panel';
import UserSearchBase from './base-panel';

interface UserSearchProps extends UserSearchBaseProps, ModalProps {
  renderType?: 'base' | 'modal';
}

const UserSearch = forwardRef<RefUserSearchBaseProps, UserSearchProps>(
  (props, ref) => {
    const { renderType = 'base', defaultValue, ...restProps } = props;

    return renderType === 'base' ? (
      <UserSearchBase defaultValue={defaultValue} />
    ) : (
      <CoreModal title="用户搜索" width={800} {...restProps}>
        <UserSearchBase defaultValue={defaultValue} ref={ref} />
      </CoreModal>
    );
  }
);

export default UserSearch;
