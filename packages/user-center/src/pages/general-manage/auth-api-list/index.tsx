// 数据 api 权限管理
import { CoreTable } from '@/components';
import type {
  CoreTableProps,
  CoreTableRef,
  CreateDataSourceType
} from '@/components/core-table';
import { coreAuthManageApi } from '@/services';
import {
  AppstoreAddOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import {
  formateTime,
  isApiSuccess,
  removeEmptyFields,
  useSiteToken
} from '@utopia/micro-main-utils';
import type { AuthManage } from '@utopia/micro-types';
import { Button, Modal, Popconfirm, Tag } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import type { AuthApiOperationDefaultValue } from './auth-api-operation';
import AuthApiManageOperation from './auth-api-operation';

import Styles from './index.less';

type RecordType = AuthManage;

const EMPTY_AUTH_API_LIST: CreateDataSourceType<RecordType> = {
  data: [],
  pagination: {}
};

interface AuthApiOperationPanelInfoProps extends AuthApiOperationDefaultValue {
  open: boolean;
}

const initAuthApiOperationPanelInfo: AuthApiOperationPanelInfoProps = {
  open: false,
  id: '',
  name: '',
  code: '',
  description: '',
  group: {
    label: '',
    value: ''
  }
};

const AuthApiManageList: React.FC = () => {
  const [authApiOperationPanelInfo, setAuthApiOperationPanelInfo] =
    useState<AuthApiOperationPanelInfoProps>(initAuthApiOperationPanelInfo);
  const [authApiSelectRows, setAuthApiSelectRows] = useState<RecordType[]>([]);

  const authApiListTableRef = useRef<CoreTableRef>(null);
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

  const authApiListDataSourcePromise = useCallback(
    async (tableFormFields): Promise<CreateDataSourceType<RecordType>> => {
      const { data, errorCode } = await coreAuthManageApi.authManageListWithGet(
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

      return EMPTY_AUTH_API_LIST;
    },
    []
  );

  const handleFormFieldsTransform = useCallback((rawFormFields) => {
    return removeEmptyFields(rawFormFields);
  }, []);

  const handleDeleteAuthApi = useCallback(async (records: RecordType[]) => {
    const { errorCode } = await coreAuthManageApi.authManageDeleteWithDelete({
      ids: records.map((item) => item.id)
    });

    if (isApiSuccess(errorCode)) {
      authApiListTableRef.current?.reloadData();
    }
  }, []);

  const handleEditAuthApi = useCallback((record: RecordType) => {
    setAuthApiOperationPanelInfo({ ...record, open: true });
  }, []);

  const handleAuthApiOperationSuccess = useCallback(() => {
    setAuthApiOperationPanelInfo({
      ...initAuthApiOperationPanelInfo,
      open: false
    });
  }, []);

  const colums: CoreTableProps<RecordType>['columns'] = [
    { title: '数据权限名称', dataIndex: 'name', width: 150 },
    {
      title: '权限编码',
      dataIndex: 'code',
      width: 190,
      render: (value) => <Tag color="blue">{value}</Tag>
    },
    {
      title: '分组名称',
      dataIndex: 'group',
      width: 150,
      render: (value) => <Tag>{value.label}</Tag>
    },
    {
      title: '权限描述',
      dataIndex: 'description',
      width: 240
    },
    {
      title: 'api 路径',
      dataIndex: 'apiUrl',
      width: 240
    },
    {
      title: '创建人',
      dataIndex: 'createdBy',
      width: 150
    },
    {
      title: '创建时间',
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
      render: (_, record) => {
        return (
          <div className="colums-operate-wrap">
            <div
              className="auth-api-operation-item"
              title="编辑"
              onClick={() => {
                handleEditAuthApi(record);
              }}
            >
              <EditOutlined />
            </div>
            <Popconfirm
              title="删除该数据权限"
              description="该操作不可逆，确认删除？"
              onConfirm={() => {
                handleDeleteAuthApi([record]);
              }}
            >
              <div
                className="auth-api-operation-item"
                title="删除"
                style={{ color: colorHighlight }}
              >
                <DeleteOutlined />
              </div>
            </Popconfirm>
          </div>
        );
      }
    }
  ];

  const headerOperationBar = [
    <Button
      icon={<AppstoreAddOutlined />}
      onClick={() => {
        setAuthApiOperationPanelInfo({
          ...initAuthApiOperationPanelInfo,
          open: true
        });
      }}
    >
      新建
    </Button>,
    <Button
      icon={<DeleteOutlined />}
      disabled={authApiSelectRows.length === 0}
      onClick={() => {
        modal.confirm({
          title: '确定批量删除所选数据权限？改操作不可逆！',
          onOk: () => handleDeleteAuthApi(authApiSelectRows)
        });
      }}
    >
      删除
    </Button>
  ];

  return (
    <div className={Styles['auth-api-list-manage-wrap']}>
      {authApiOperationPanelInfo.open ? (
        <div className="create-auth-api-wrap">
          <div
            style={{
              cursor: 'pointer',
              padding: paddingSM,
              border: `1px solid ${colorBorderSecondary}`,
              color: colorText
            }}
            onClick={() => {
              setAuthApiOperationPanelInfo({
                ...initAuthApiOperationPanelInfo,
                open: false
              });
            }}
          >
            <ArrowLeftOutlined />
            <span style={{ marginLeft: marginSM }}>
              {`${authApiOperationPanelInfo.id ? '编辑' : '新建'}数据权限`}
            </span>
          </div>
          <div
            className="create-auth-api-form"
            style={{ marginTop: marginXXL }}
          >
            <AuthApiManageOperation
              defaultValue={authApiOperationPanelInfo}
              onEditSuccess={handleAuthApiOperationSuccess}
              onCreatedSuccess={handleAuthApiOperationSuccess}
            />
          </div>
        </div>
      ) : (
        <div className="auth-api-list-table">
          <CoreTable<RecordType>
            createDataSource={authApiListDataSourcePromise}
            formFieldsTransform={handleFormFieldsTransform}
            columns={colums}
            rowKey="id"
            ref={authApiListTableRef}
            headerOperationBar={headerOperationBar}
            headerSearchBar={{ placeholder: '请输入数据权限名称、描述' }}
            showSerialNumber
            rowSelection={{
              selectedRowKeys: authApiSelectRows.map((item) => item.id),
              onChange: (_, selectedRows) => {
                setAuthApiSelectRows(selectedRows);
              }
            }}
          />
        </div>
      )}
      {contextHolder}
    </div>
  );
};

export default AuthApiManageList;
