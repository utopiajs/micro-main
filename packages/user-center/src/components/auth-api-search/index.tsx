// api 数据权限搜索
import { CoreModal } from '@/components';
import type { ModalProps } from 'antd';
import { forwardRef } from 'react';
import type {
  AuthApiSearchBaseProps,
  RefAuthApiSearchBaseProps
} from './base-panel';
import AuthApiSearchBase from './base-panel';

interface UserSearchProps extends AuthApiSearchBaseProps, ModalProps {
  renderType?: 'base' | 'modal';
}

const AuthApiSearch = forwardRef<RefAuthApiSearchBaseProps, UserSearchProps>(
  (props, ref) => {
    const { renderType = 'base', defaultValue, ...restProps } = props;

    return renderType === 'base' ? (
      <AuthApiSearchBase defaultValue={defaultValue} />
    ) : (
      <CoreModal title="权限搜索" width={800} {...restProps}>
        <AuthApiSearchBase defaultValue={defaultValue} ref={ref} />
      </CoreModal>
    );
  }
);

export default AuthApiSearch;
