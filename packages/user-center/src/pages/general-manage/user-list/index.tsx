// 用户管理
import { CoreTable } from '@/components';
import type {
  CoreTableProps,
  CreateDataSourceType
} from '@/components/core-table';
import type { User } from '@utopia/micro-types';
import { Button } from 'antd';
import React, { useCallback } from 'react';

import Styles from './index.less';

type RecordType = Omit<User, 'preferenceSetting'>;

const UserList: React.FC = () => {
  const userDataSourcePromise = useCallback((): Promise<
    CreateDataSourceType<RecordType>
  > => {
    return new Promise((resolve) => {
      resolve({
        data: new Array(15).fill({}).map((item, index) => ({
          name: 'KuangPF',
          id: String(index),
          email: 'me@kuangpf.com',
          role: 'admin',
          avatar: 'https://avatars.githubusercontent.com/u/53040934?s=200&v=4'
        })),
        pagination: {
          total: 15,
          pageSize: 10,
          current: 1
        }
      });
    });
  }, []);

  const colums: CoreTableProps<RecordType>['columns'] = [
    { title: '用户名', dataIndex: 'name', width: 200 }
  ];

  const headerOperationBar = [<Button>新建</Button>];

  return (
    <div className={Styles['user-list-manage-wrap']}>
      <div className="user-list-table">
        <CoreTable<RecordType>
          createDataSource={userDataSourcePromise}
          columns={colums}
          rowKey="id"
          headerOperationBar={headerOperationBar}
          showSerialNumber
          rowSelection={{}}
        />
      </div>
    </div>
  );
};

export default UserList;
