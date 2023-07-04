// 用户管理
import { CoreTable } from '@/components';
import type {
  CoreTableProps,
  CreateDataSourceType
} from '@/components/core-table';
import { coreUserApi } from '@/services';
import { isApiSuccess } from '@utopia/micro-main-utils';
import type { User } from '@utopia/micro-types';
import { Button } from 'antd';
import React, { useCallback } from 'react';

import Styles from './index.less';

type RecordType = Omit<User, 'preferenceSetting'>;

const EMPTY_USER_LIST: CreateDataSourceType<RecordType> = {
  data: [],
  pagination: {}
};

const UserList: React.FC = () => {
  const userDataSourcePromise = useCallback(async (): Promise<
    CreateDataSourceType<RecordType>
  > => {
    const { data, errorCode } = await coreUserApi.usersListWithGet();
    if (isApiSuccess(errorCode)) {
      return {
        data: data.data || [],
        pagination: {
          ...data.paging,
          current: data.paging?.pageNum
        }
      };
    }

    return EMPTY_USER_LIST;
  }, []);

  const colums: CoreTableProps<RecordType>['columns'] = [
    { title: '用户名', dataIndex: 'name', width: 150 },
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
