// 用户管理
import { CoreTable } from '@/components';
import type { CoreTableProps } from '@/components/core-table';
import type { User } from '@utopia/micro-types';
import React, { useCallback } from 'react';

import Styles from './index.less';

type RecordType = Omit<User, 'preferenceSetting'>;

const UserList: React.FC = () => {
  const userDataSourcePromise: CoreTableProps<RecordType>['createDataSource'] =
    useCallback(() => {
      return new Promise((resolve) => {
        resolve({
          data: [{ name: 'KuangPF' }],
          pagination: {
            total: 1,
            pageSize: 10
          }
        });
      });
    }, []);

  const colums: CoreTableProps<RecordType>['columns'] = [
    { title: '用户名', dataIndex: 'name', width: 200 }
  ];

  return (
    <div className={Styles['user-list-manage-wrap']}>
      <div className="user-list-table">
        <CoreTable<RecordType>
          createDataSource={userDataSourcePromise}
          columns={colums}
          rowKey="id"
          showSerialNumber
        />
      </div>
    </div>
  );
};

export default UserList;
