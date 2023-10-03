// 用户搜索基础面板
import { COMPONENT_CLASSNAME_PREFIX } from '@/constants/component';
import { coreUserApi } from '@/services';
import { CoreTable } from '@utopia/core-component';
import type {
  CoreTableProps,
  CreateDataSourceType
} from '@utopia/core-component/es/components/core-table';
import {
  cloneDeep,
  formateTime,
  isApiSuccess,
  removeEmptyFields,
  useSiteToken
} from '@utopia/micro-main-utils';
import type { User } from '@utopia/micro-types';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState
} from 'react';
import './index.less';

export type RecordType = Omit<User, 'preferenceSetting'>;
export interface UserSearchBaseProps {
  defaultValue?: RecordType[];
}
export interface RefUserSearchBaseProps {
  userSelectRows: RecordType[];
}

const prefixCls = COMPONENT_CLASSNAME_PREFIX;
const EMPTY_USER_LIST: CreateDataSourceType<RecordType> = {
  data: [],
  pagination: {}
};

const UserSearchBase = forwardRef<RefUserSearchBaseProps, UserSearchBaseProps>(
  (props, ref) => {
    const { defaultValue = [] } = props;
    const [userSelectRows, setUserSelectRows] =
      useState<RecordType[]>(defaultValue);
    const {
      token: { colorPrimary, marginXS, marginXXS }
    } = useSiteToken();

    useImperativeHandle(ref, () => {
      return {
        userSelectRows
      };
    });

    const useDateSourcePromise = useCallback(
      async (tableFormFields): Promise<CreateDataSourceType<RecordType>> => {
        const { data, errorCode } = await coreUserApi.usersListWithGet(
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
        return EMPTY_USER_LIST;
      },
      []
    );

    const userSelectedInfo = useMemo(
      () => [
        <div className={`${prefixCls}-user-search-table-selected-info`}>
          <span>已选择：</span>
          <span
            style={{
              fontWeight: 'bold',
              color: colorPrimary,
              marginInlineStart: marginXS,
              marginInlineEnd: marginXXS
            }}
          >
            {userSelectRows.length}
          </span>
          <span>个人员</span>
        </div>
      ],
      [colorPrimary, marginXXS, marginXS, userSelectRows]
    );

    const handleFormFieldsTransform = useCallback((rawFormFields) => {
      return removeEmptyFields(rawFormFields);
    }, []);

    // select single
    const handleSelectedRows = useCallback(
      (record, selected) => {
        let nextUserSelectRows = cloneDeep(userSelectRows);
        if (selected) {
          nextUserSelectRows.push(record);
        } else {
          nextUserSelectRows = nextUserSelectRows.filter(
            (item) => item.id !== record.id
          );
        }
        setUserSelectRows(nextUserSelectRows);
      },
      [userSelectRows]
    );

    // select all
    const handleSelectedAllRows = useCallback(
      (selected: boolean, _, changeRows: RecordType[]) => {
        let nextUserSelectRows: RecordType[] = cloneDeep(userSelectRows);
        if (selected) {
          nextUserSelectRows = nextUserSelectRows.concat(changeRows);
        } else {
          nextUserSelectRows = nextUserSelectRows.filter(
            (item) => changeRows.findIndex((_item) => _item.id === item.id) < 0
          );
        }
        setUserSelectRows(nextUserSelectRows);
      },
      [userSelectRows]
    );

    const colums: CoreTableProps<RecordType>['columns'] = [
      {
        title: '用户名',
        dataIndex: 'name',
        width: 150
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        width: 240
      },
      {
        title: '创建时间',
        dataIndex: 'createdTime',
        width: 200,
        render: (value) => <span>{formateTime(value)}</span>
      }
    ];

    return (
      <div className={`${prefixCls}-user-search-base-panel`}>
        <div className={`${prefixCls}-user-search-table-wrap`}>
          <CoreTable<RecordType>
            showSerialNumber
            columns={colums}
            size="small"
            pagination={{ size: 'small', pageSize: 10 }}
            rowKey="id"
            headerSearchBar={{ placeholder: '请输入用户名、邮箱' }}
            headerOperationBar={userSelectedInfo}
            createDataSource={useDateSourcePromise}
            formFieldsTransform={handleFormFieldsTransform}
            rowSelection={{
              selectedRowKeys: userSelectRows.map((item) => item.id),
              onSelect: handleSelectedRows,
              onSelectAll: handleSelectedAllRows
            }}
          />
        </div>
      </div>
    );
  }
);

export default UserSearchBase;
