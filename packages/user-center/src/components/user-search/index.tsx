// 用户搜索
import { CoreModal } from '@/components';
import React, { useCallback, useState } from 'react';
import type { UserSearchBaseProps } from './base-panel';
import UserSearchBase from './base-panel';

interface UserSearchProps extends UserSearchBaseProps {
  renderType?: 'base' | 'modal';
}

const UserSearch: React.FC<UserSearchProps> = (props) => {
  const { renderType = 'base', defaultValue } = props;

  const [open, setOpen] = useState(true);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  return renderType === 'base' ? (
    <UserSearch defaultValue={defaultValue} />
  ) : (
    <CoreModal open={open} title="用户搜索" width={800} onCancel={handleCancel}>
      <UserSearchBase defaultValue={defaultValue} />
    </CoreModal>
  );
};

export default UserSearch;
