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
          id: String(`5ebac534954b54139806c112${index}`),
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
    { title: '用户名', dataIndex: 'name', width: 200 },
    {
      title: 'id',
      dataIndex: 'id',
      width: 300
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 200,
      render: (value) => (
        <img alt="用户头像" width={30} height={30} src={value} />
      )
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 200
    },
    {
      title: '角色',
      dataIndex: 'role',
      width: 150
    },
    {
      title: '创建日期',
      dataIndex: 'role',
      width: 200,
      render: () => <span>2023-06-22</span>
    },
    {
      title: '操作'
    }
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
