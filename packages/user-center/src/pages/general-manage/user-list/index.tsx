// 用户管理
import { CoreTable } from '@/components';
import type {
  CoreTableProps,
  CoreTableRef,
  CreateDataSourceType
} from '@/components/core-table';
import { coreUserApi } from '@/services';
import { DeleteOutlined, RollbackOutlined } from '@ant-design/icons';
import {
  isApiSuccess,
  removeEmptyFields,
  useSiteToken
} from '@utopia/micro-main-utils';
import type { User } from '@utopia/micro-types';
import { Button, Popconfirm } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import CreateUser from './create-user';

import Styles from './index.less';

type RecordType = Omit<User, 'preferenceSetting'>;

const EMPTY_USER_LIST: CreateDataSourceType<RecordType> = {
  data: [],
  pagination: {}
};

const UserList: React.FC = () => {
  const [showCreateUserPanel, setShowCreateUserPanel] =
    useState<boolean>(false);
  const userListTableRef = useRef<CoreTableRef>(null);
  const {
    token: {
      colorHighlight,
      paddingSM,
      colorBorderSecondary,
      marginSM,
      marginXXL
    }
  } = useSiteToken();

  const userDataSourcePromise = useCallback(
    async (tableFormFields): Promise<CreateDataSourceType<RecordType>> => {
      const { data, errorCode } = await coreUserApi.usersListWithGet(
        tableFormFields
      );
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
    },
    []
  );

  const handleFormFieldsTransform = useCallback((rawFormFields) => {
    return removeEmptyFields(rawFormFields);
  }, []);

  const handleDeleteUser = useCallback(async (record: RecordType) => {
    const { errorCode } = await coreUserApi.usersDeleteWithDelete({
      userId: record.id
    });
    if (isApiSuccess(errorCode)) {
      userListTableRef.current?.reloadData();
    }
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
      width: 240
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
      title: '操作',
      render: (_, record) => {
        return (
          <Popconfirm
            title="删除该用户"
            description="该操作不可逆，确认删除？"
            onConfirm={() => {
              handleDeleteUser(record);
            }}
          >
            <div
              className="user-operation-item"
              title="删除"
              style={{ color: colorHighlight }}
            >
              <DeleteOutlined>删除</DeleteOutlined>
            </div>
          </Popconfirm>
        );
      }
    }
  ];

  const headerOperationBar = [
    <Button
      onClick={() => {
        setShowCreateUserPanel(true);
      }}
    >
      新建
    </Button>
  ];

  return (
    <div className={Styles['user-list-manage-wrap']}>
      {showCreateUserPanel ? (
        <div className="create-user-wrap">
          <div
            style={{
              cursor: 'pointer',
              padding: paddingSM,
              border: `1px solid ${colorBorderSecondary}`
            }}
            onClick={() => {
              setShowCreateUserPanel(false);
            }}
          >
            <RollbackOutlined />
            <span style={{ marginLeft: marginSM }}>新建用户</span>
          </div>
          <div className="create-user-form" style={{ marginTop: marginXXL }}>
            <CreateUser
              onCreatedSuccess={() => {
                setShowCreateUserPanel(false);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="user-list-table">
          <CoreTable<RecordType>
            createDataSource={userDataSourcePromise}
            formFieldsTransform={handleFormFieldsTransform}
            columns={colums}
            rowKey="id"
            ref={userListTableRef}
            headerOperationBar={headerOperationBar}
            headerSearchBar={{ placeholder: '请输入用户名、邮箱' }}
            showSerialNumber
            rowSelection={{}}
          />
        </div>
      )}
    </div>
  );
};

export default UserList;
