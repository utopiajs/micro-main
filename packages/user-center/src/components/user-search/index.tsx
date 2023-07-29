// 用户搜索
import { CoreModal } from '@/components';
import type { ModalProps } from 'antd';
import React from 'react';
import type { UserSearchBaseProps } from './base-panel';
import UserSearchBase from './base-panel';

interface UserSearchProps extends UserSearchBaseProps, ModalProps {
  renderType?: 'base' | 'modal';
}

const UserSearch: React.FC<UserSearchProps> = (props) => {
  const { renderType = 'base', defaultValue, ...restProps } = props;

  return renderType === 'base' ? (
    <UserSearch defaultValue={defaultValue} />
  ) : (
    <CoreModal title="用户搜索" width={800} {...restProps}>
      <UserSearchBase defaultValue={defaultValue} />
    </CoreModal>
  );
};

export default UserSearch;
