import { CoreTable } from '@utopia/core-component';
import type {
  CoreTableProps,
  CreateDataSourceType
} from '@utopia/core-component/es/components/core-table';
import { COMPONENT_CLASSNAME_PREFIX } from '@/constants/component';
import { coreAuthManageApi } from '@/services';
import {
  cloneDeep,
  isApiSuccess,
  removeEmptyFields,
  useSiteToken
} from '@utopia/micro-main-utils';
import type { AuthManage } from '@utopia/micro-types';
import { Tag } from 'antd';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState
} from 'react';
import './index.less';

export type RecordType = AuthManage;
export interface AuthApiSearchBaseProps {
  defaultValue?: RecordType[];
}
export interface RefAuthApiSearchBaseProps {
  authApiSelectRows: RecordType[];
}

const prefixCls = COMPONENT_CLASSNAME_PREFIX;
const EMPTY_AUTH_API_LIST: CreateDataSourceType<RecordType> = {
  data: [],
  pagination: {}
};

const AuthApiSearchBase = forwardRef<
  RefAuthApiSearchBaseProps,
  AuthApiSearchBaseProps
>((props, ref) => {
  const { defaultValue = [] } = props;
  const [authApiSelectRows, setAuthApiSelectRows] =
    useState<RecordType[]>(defaultValue);
  const {
    token: { colorPrimary, marginXS, marginXXS }
  } = useSiteToken();

  useImperativeHandle(ref, () => {
    return {
      authApiSelectRows
    };
  });

  const useDateSourcePromise = useCallback(
    async (tableFormFields): Promise<CreateDataSourceType<RecordType>> => {
      const { data, errorCode } = await coreAuthManageApi.authManageListWithGet(
        tableFormFields
      );
      if (isApiSuccess(errorCode)) {
        return {
          data: data.data ?? [],
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

  const authApiSelectedInfo = useMemo(
    () => [
      <div className={`${prefixCls}-auth-api-table-selected-info`}>
        <span>已选择：</span>
        <span
          style={{
            fontWeight: 'bold',
            color: colorPrimary,
            marginInlineStart: marginXS,
            marginInlineEnd: marginXXS
          }}
        >
          {authApiSelectRows.length}
        </span>
        <span>条数据权限</span>
      </div>
    ],
    [colorPrimary, marginXXS, marginXS, authApiSelectRows]
  );

  const handleFormFieldsTransform = useCallback((rawFormFields) => {
    return removeEmptyFields(rawFormFields);
  }, []);

  // select single
  const handleSelectedRows = useCallback(
    (record, selected) => {
      let nextauthApiSelectRows = cloneDeep(authApiSelectRows);
      if (selected) {
        nextauthApiSelectRows.push(record);
      } else {
        nextauthApiSelectRows = nextauthApiSelectRows.filter(
          (item) => item.id !== record.id
        );
      }
      setAuthApiSelectRows(nextauthApiSelectRows);
    },
    [authApiSelectRows]
  );

  // select all
  const handleSelectedAllRows = useCallback(
    (selected: boolean, _, changeRows: RecordType[]) => {
      let nextauthApiSelectRows: RecordType[] = cloneDeep(authApiSelectRows);
      if (selected) {
        nextauthApiSelectRows = nextauthApiSelectRows.concat(changeRows);
      } else {
        nextauthApiSelectRows = nextauthApiSelectRows.filter(
          (item) => changeRows.findIndex((_item) => _item.id === item.id) < 0
        );
      }
      setAuthApiSelectRows(nextauthApiSelectRows);
    },
    [authApiSelectRows]
  );

  const colums: CoreTableProps<RecordType>['columns'] = [
    {
      title: '数据权限名称',
      dataIndex: 'name',
      width: 150
    },
    {
      title: '权限编码',
      dataIndex: 'code',
      width: 240
    },
    {
      title: '分组名称',
      dataIndex: 'group',
      width: 200,
      render: (value) => <Tag>{value.label}</Tag>
    }
  ];

  return (
    <div className={`${prefixCls}-auth-api-search-base-panel`}>
      <div className={`${prefixCls}-auth-api-search-table-wrap`}>
        <CoreTable<RecordType>
          showSerialNumber
          columns={colums}
          size="small"
          pagination={{ size: 'small', pageSize: 10 }}
          rowKey="id"
          headerSearchBar={{ placeholder: '请输入权限名称、编码' }}
          headerOperationBar={authApiSelectedInfo}
          createDataSource={useDateSourcePromise}
          formFieldsTransform={handleFormFieldsTransform}
          rowSelection={{
            selectedRowKeys: authApiSelectRows.map((item) => item.id),
            onSelect: handleSelectedRows,
            onSelectAll: handleSelectedAllRows
          }}
        />
      </div>
    </div>
  );
});

export default AuthApiSearchBase;
