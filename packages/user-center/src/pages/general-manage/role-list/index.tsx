// 角色管理
import {
  AuthApiSearch,
  MenuTransfer,
  UserSearch
} from '@/components';
import { CoreTable } from '@utopia/core-component';
import type {
  RecordType as AuthApiSearchRecordType,
  RefAuthApiSearchBaseProps
} from '@/components/auth-api-search/base-panel';
import type {
  CoreTableProps,
  CoreTableRef,
  CreateDataSourceType
} from '@utopia/core-component/es/components/core-table';
import type { RefMenuTransferBaseProps } from '@/components/menu-transfer/base-panel';
import type {
  RecordType as UserSearchRecordType,
  RefUserSearchBaseProps
} from '@/components/user-search/base-panel';
import qiankunStateFromMaster from '@/mock/qiankunStateFromMaster';
import { coreMenuApi, coreRoleApi, coreRoleMappingModules } from '@/services';
import {
  AppstoreAddOutlined,
  DatabaseOutlined,
  DeleteOutlined,
  EditOutlined,
  RollbackOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import {
  formateTime,
  isApiSuccess,
  removeEmptyFields,
  useSiteToken
} from '@utopia/micro-main-utils';
import type {
  Menu,
  QiankunStateFromMasterProps,
  Role
} from '@utopia/micro-types';
import { Button, Modal, Popconfirm } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import type { RoleOperationDefaultValue } from './role-operation';
import RoleOperation from './role-operation';

import Styles from './index.less';

type RecordType = Role;
type RoleMappingModule = 'menu' | 'user' | 'auth-api';

const EMPTY_ROLE_LIST: CreateDataSourceType<RecordType> = {
  data: [],
  pagination: {}
};

interface RoleOperationPanelInfoProps extends RoleOperationDefaultValue {
  open: boolean;
}
interface UserSearchInfoProps {
  open?: boolean;
  defaultValue?: UserSearchRecordType[];
}
interface AuthApiSearchInfoProps {
  open?: boolean;
  defaultValue?: AuthApiSearchRecordType[];
}

interface MenuTransferInfoProps {
  open?: boolean;
  defaultValue?: Menu[];
}

const initRoleOperationPanelInfo: RoleOperationPanelInfoProps = {
  open: false,
  id: '',
  name: '',
  description: ''
};

const RoleList: React.FC = () => {
  const {
    qiankunGlobalState,
    setQiankunGlobalState
  }: QiankunStateFromMasterProps =
    useModel('@@qiankunStateFromMaster') || qiankunStateFromMaster;
  const [roleOperationPanelInfo, setRoleOperationPanelInfo] =
    useState<RoleOperationPanelInfoProps>(initRoleOperationPanelInfo);
  const [roleSelectRows, setRoleSelectRows] = useState<RecordType[]>([]);
  const [userSearchInfo, setUserSearchInfo] = useState<UserSearchInfoProps>({
    open: false,
    defaultValue: []
  });
  const [authApiSearchInfo, setAuthApiSearchInfo] =
    useState<AuthApiSearchInfoProps>({
      open: false,
      defaultValue: []
    });
  const [menuTransferInfo, setMenuTransferInfo] =
    useState<MenuTransferInfoProps>({
      open: false,
      defaultValue: []
    });
  const roleListTableRef = useRef<CoreTableRef>(null);
  const userSearchRef = useRef<RefUserSearchBaseProps>({ userSelectRows: [] });
  const authApiSearchRef = useRef<RefAuthApiSearchBaseProps>({
    authApiSelectRows: []
  });
  const menuTransferRef = useRef<RefMenuTransferBaseProps>({ targetList: [] });
  const currentRoleRecordRef = useRef<RecordType>();
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

  const roleDataSourcePromise = useCallback(
    async (tableFormFields): Promise<CreateDataSourceType<RecordType>> => {
      const { data, errorCode } = await coreRoleApi.roleListWithGet(
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

      return EMPTY_ROLE_LIST;
    },
    []
  );

  const handleFormFieldsTransform = useCallback((rawFormFields) => {
    return removeEmptyFields(rawFormFields);
  }, []);

  const handleDeleteRole = useCallback(async (records: RecordType[]) => {
    const { errorCode } = await coreRoleApi.roleDeleteWithDelete({
      roleIds: records.map((item) => item.id)
    });

    if (isApiSuccess(errorCode)) {
      roleListTableRef.current?.reloadData();
    }
  }, []);

  const handleEditRole = useCallback((record: RecordType) => {
    setRoleOperationPanelInfo({ ...record, open: true });
  }, []);

  // handleMappingModule
  const handleMappingModule = useCallback(
    async (record: RecordType, mappingModuleType: RoleMappingModule) => {
      currentRoleRecordRef.current = record;
      const { errorCode, data } =
        await coreRoleMappingModules.roleMappingModuleInfoWithGet({
          roleId: record.id
        });
      if (isApiSuccess(errorCode)) {
        if (mappingModuleType === 'user') {
          setUserSearchInfo({
            open: true,
            defaultValue: data.userList
          });
        } else if (mappingModuleType === 'menu') {
          setMenuTransferInfo({
            open: true,
            defaultValue: data.menuList
          });
        } else if (mappingModuleType === 'auth-api') {
          setAuthApiSearchInfo({
            open: true,
            defaultValue: data.authApiList
          });
        }
      }
    },
    []
  );

  const handleRoleOperationSuccess = useCallback(() => {
    setRoleOperationPanelInfo({
      ...initRoleOperationPanelInfo,
      open: false
    });
  }, []);

  // 更新主平台菜单树
  const updateMicroMainCoreMenu = useCallback(async () => {
    const { errorCode, data } = await coreMenuApi.menuUserTreeWithGet();
    if (isApiSuccess(errorCode)) {
      setQiankunGlobalState({
        ...qiankunGlobalState,
        menuConfigUserTree: data
      });
    }
  }, [qiankunGlobalState, setQiankunGlobalState]);

  const handleRoleMappingModuleClose = useCallback(
    (type: RoleMappingModule) => {
      if (type === 'user') {
        setUserSearchInfo({
          open: false
        });
      } else if (type === 'menu') {
        setMenuTransferInfo({
          open: false
        });
      } else if (type === 'auth-api') {
        setAuthApiSearchInfo({
          open: false
        });
      }
    },
    []
  );

  // 处理添加角色映射
  const handleRoleMappingModuleOk = useCallback(
    async (type: RoleMappingModule) => {
      const roleMappingModuleParam: {
        roleId: string;
        userIds?: string[];
        menuIds?: string[];
        authApiIds?: string[];
      } = {
        roleId: currentRoleRecordRef.current?.id ?? ''
      };
      if (type === 'user') {
        const userIds = userSearchRef.current?.userSelectRows.map(
          (item) => item.id
        );
        roleMappingModuleParam.userIds = userIds;
      }
      if (type === 'menu') {
        const menuSelectedList = menuTransferRef.current.targetList.map(
          (item) => item.id
        );
        roleMappingModuleParam.menuIds = menuSelectedList;
      }
      if (type === 'auth-api') {
        const menuSelectedList = authApiSearchRef.current.authApiSelectRows.map(
          (item) => item.id
        );
        roleMappingModuleParam.authApiIds = menuSelectedList;
      }

      const { errorCode } =
        await coreRoleMappingModules.roleMappingModuleWithPost(
          roleMappingModuleParam
        );
      if (isApiSuccess(errorCode)) {
        roleListTableRef.current?.reloadData();
        handleRoleMappingModuleClose(type);
        if (type === 'menu') {
          await updateMicroMainCoreMenu();
        }
      }
    },
    [handleRoleMappingModuleClose, updateMicroMainCoreMenu]
  );

  const colums: CoreTableProps<RecordType>['columns'] = [
    { title: '角色名称', dataIndex: 'name', width: 150 },
    {
      title: 'id',
      dataIndex: 'id',
      width: 260
    },
    {
      title: '角色描述',
      dataIndex: 'description',
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
              className="role-operation-item"
              title="关联用户"
              onClick={() => {
                handleMappingModule(record, 'user');
              }}
            >
              <UsergroupAddOutlined />
            </div>
            <div
              className="role-operation-item"
              title="关联模块"
              onClick={() => {
                handleMappingModule(record, 'menu');
              }}
            >
              <AppstoreAddOutlined />
            </div>
            <div
              className="role-operation-item"
              title="关联数据权限"
              onClick={() => {
                handleMappingModule(record, 'auth-api');
              }}
            >
              <DatabaseOutlined />
            </div>

            <div
              className="role-operation-item"
              title="编辑"
              onClick={() => {
                handleEditRole(record);
              }}
            >
              <EditOutlined />
            </div>
            <Popconfirm
              title="删除该角色"
              description="该操作不可逆，确认删除？"
              onConfirm={() => {
                handleDeleteRole([record]);
              }}
            >
              <div
                className="role-operation-item"
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
        setRoleOperationPanelInfo({
          ...initRoleOperationPanelInfo,
          open: true
        });
      }}
    >
      新建
    </Button>,
    <Button
      icon={<DeleteOutlined />}
      disabled={roleSelectRows.length === 0}
      onClick={() => {
        modal.confirm({
          title: '确定批量删除所选角色？改操作不可逆！',
          onOk: () => handleDeleteRole(roleSelectRows)
        });
      }}
    >
      删除
    </Button>
  ];

  return (
    <div className={Styles['role-list-manage-wrap']}>
      {roleOperationPanelInfo.open ? (
        <div className="create-role-wrap">
          <div
            style={{
              cursor: 'pointer',
              padding: paddingSM,
              border: `1px solid ${colorBorderSecondary}`,
              color: colorText
            }}
            onClick={() => {
              setRoleOperationPanelInfo({
                ...initRoleOperationPanelInfo,
                open: false
              });
            }}
          >
            <RollbackOutlined />
            <span style={{ marginLeft: marginSM }}>
              {`${roleOperationPanelInfo.id ? '编辑' : '新建'}角色`}
            </span>
          </div>
          <div className="create-role-form" style={{ marginTop: marginXXL }}>
            <RoleOperation
              defaultValue={roleOperationPanelInfo}
              onEditSuccess={handleRoleOperationSuccess}
              onCreatedSuccess={handleRoleOperationSuccess}
            />
          </div>
        </div>
      ) : (
        <div className="role-list-table">
          <CoreTable<RecordType>
            createDataSource={roleDataSourcePromise}
            formFieldsTransform={handleFormFieldsTransform}
            columns={colums}
            rowKey="id"
            ref={roleListTableRef}
            headerOperationBar={headerOperationBar}
            headerSearchBar={{ placeholder: '请输入角色名称、描述' }}
            showSerialNumber
            rowSelection={{
              selectedRowKeys: roleSelectRows.map((item) => item.id),
              onChange: (_, selectedRows) => {
                setRoleSelectRows(selectedRows);
              }
            }}
          />
        </div>
      )}
      <UserSearch
        ref={userSearchRef}
        destroyOnClose
        renderType="modal"
        onCancel={() => {
          handleRoleMappingModuleClose('user');
        }}
        onOk={() => {
          handleRoleMappingModuleOk('user');
        }}
        {...userSearchInfo}
      />
      <AuthApiSearch
        ref={authApiSearchRef}
        destroyOnClose
        renderType="modal"
        onCancel={() => {
          handleRoleMappingModuleClose('auth-api');
        }}
        onOk={() => {
          handleRoleMappingModuleOk('auth-api');
        }}
        {...authApiSearchInfo}
      />
      <MenuTransfer
        key={currentRoleRecordRef.current?.id}
        ref={menuTransferRef}
        renderType="modal"
        onCancel={() => {
          handleRoleMappingModuleClose('menu');
        }}
        onOk={() => {
          handleRoleMappingModuleOk('menu');
        }}
        {...menuTransferInfo}
      />
      {contextHolder}
    </div>
  );
};

export default RoleList;
