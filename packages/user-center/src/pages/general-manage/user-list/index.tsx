// 用户管理
import { CoreTable } from '@utopia/core-component';
import type {
  CoreTableProps,
  CoreTableRef,
  CreateDataSourceType
} from '@utopia/core-component/es/components/core-table';
import { coreUserApi } from '@/services';
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';
import {
  formateTime,
  isApiSuccess,
  removeEmptyFields,
  useSiteToken
} from '@utopia/micro-main-utils';
import type { User } from '@utopia/micro-types';
import { Button, Modal, Popconfirm, Tag } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import UserOperation from './user-operation';

import Styles from './index.less';

type RecordType = Omit<User, 'preferenceSetting'>;
interface UserOperationPanelInfoProps {
  open?: boolean;
  defaultValue?: Partial<User>;
}

const EMPTY_USER_LIST: CreateDataSourceType<RecordType> = {
  data: [],
  pagination: {}
};
const { EllipsisContent } = CoreTable;

const UserList: React.FC = () => {
  const [userOperationPanelInfo, setUserOperationPanelInfo] =
    useState<UserOperationPanelInfoProps>({
      open: false,
      defaultValue: {}
    });
  const [userSelectedRows, setUserSelectedRows] = useState<RecordType[]>([]);
  const userListTableRef = useRef<CoreTableRef>(null);
  const [modal, contextHolder] = Modal.useModal();
  const {
    token: {
      colorHighlight,
      paddingSM,
      colorBorderSecondary,
      marginSM,
      marginXXL,
      colorText
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

  const handleDeleteUser = useCallback(async (records: RecordType[]) => {
    const { errorCode } = await coreUserApi.usersDeleteWithDelete({
      userIds: records.map((item) => item.id)
    });
    if (isApiSuccess(errorCode)) {
      userListTableRef.current?.reloadData();
      setUserSelectedRows([]);
    }
  }, []);

  const colums: CoreTableProps<RecordType>['columns'] = [
    { title: '用户名', dataIndex: 'name', width: 150 },
    {
      title: 'id',
      dataIndex: 'id',
      width: 240
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 60,
      render: (value) => (
        <img alt="用户头像" width={30} height={30} src={value} />
      )
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 190
    },
    {
      title: '角色',
      dataIndex: 'roleList',
      width: 250,
      render: (value) => (
        <EllipsisContent>
          {value.map((role, index) => (
            <Tag color="cyan" key={index}>
              {role.name}
            </Tag>
          ))}
        </EllipsisContent>
      )
    },
    {
      title: '创建日期',
      dataIndex: 'createdTime',
      width: 200,
      render: (value) => <span>{formateTime(value)}</span>
    },
    {
      title: '更新时间',
      dataIndex: 'updatedTime',
      width: 200,
      render: (value) => <span>{formateTime(value)}</span>
    },
    {
      title: '操作',
      width: 100,
      render: (_, record) => {
        return (
          <div className="colums-operate-wrap">
            <div
              className="operation-item"
              title="删除"
              style={{ color: colorHighlight }}
            >
              <Popconfirm
                title="删除该用户"
                description="该操作不可逆，确认删除？"
                onConfirm={() => {
                  handleDeleteUser([record]);
                }}
              >
                <DeleteOutlined>删除</DeleteOutlined>
              </Popconfirm>
            </div>

            <div
              className="operation-item"
              title="编辑"
              onClick={() => {
                setUserOperationPanelInfo({
                  open: true,
                  defaultValue: record
                });
              }}
            >
              <EditOutlined />
            </div>
          </div>
        );
      }
    }
  ];

  const headerOperationBar = [
    <Button
      icon={<PlusOutlined />}
      onClick={() => {
        setUserOperationPanelInfo({ open: true });
      }}
    >
      新建
    </Button>,
    <Button
      icon={<DeleteOutlined />}
      disabled={userSelectedRows.length === 0}
      onClick={() => {
        modal.confirm({
          title: '确定删除所选用户？该操作不可逆！',
          onOk: () => handleDeleteUser(userSelectedRows)
        });
      }}
    >
      删除
    </Button>
  ];

  return (
    <div className={Styles['user-list-manage-wrap']}>
      {userOperationPanelInfo.open ? (
        <div className="create-user-wrap">
          <div
            style={{
              cursor: 'pointer',
              padding: paddingSM,
              border: `1px solid ${colorBorderSecondary}`,
              color: colorText
            }}
            onClick={() => {
              setUserOperationPanelInfo({
                open: false
              });
            }}
          >
            <ArrowLeftOutlined />
            <span style={{ marginLeft: marginSM }}>
              {userOperationPanelInfo?.defaultValue?.id
                ? '编辑用户'
                : '新建用户'}
            </span>
          </div>
          <div className="create-user-form" style={{ marginTop: marginXXL }}>
            <UserOperation
              defaultValue={userOperationPanelInfo.defaultValue}
              onCreatedSuccess={() => {
                setUserOperationPanelInfo({
                  open: false
                });
              }}
              onEditedSuccess={() => {
                setUserOperationPanelInfo({
                  open: false
                });
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
            rowSelection={{
              selectedRowKeys: userSelectedRows.map((item) => item.id),
              onChange: (_, selectedRows) => {
                setUserSelectedRows(selectedRows);
              }
            }}
          />
        </div>
      )}
      {contextHolder}
    </div>
  );
};

export default UserList;
