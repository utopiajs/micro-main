// based on antd table
import { COMPONENT_CLASSNAME_PREFIX } from '@/constants/component';
import { useSiteToken, uuidv4 } from '@utopia/micro-main-utils';
import { Input, Pagination, PaginationProps, Table, TableProps } from 'antd';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import EllipsisContent from './ellipsis-content';

import './index.less';

const prefixCls = COMPONENT_CLASSNAME_PREFIX;
const EMPTY_LIST: any[] = [];
const DEFAULT_PAGINATION: PaginationProps = {
  total: 0,
  pageSize: 10,
  pageSizeOptions: [10, 20, 60, 100],
  current: 1,
  showQuickJumper: true,
  showSizeChanger: true
};

const DEFAULT_PLACEHOLDER = '请输入...';

interface HeaderSearchBarProps {
  placeholder?: string;
  defaultValue?: string;
}
interface FormFieldsProps {
  pageNum?: number;
  pageSize?: number;
  search?: string;
  [key: string]: unknown;
}
export interface CoreTableRef {
  reloadData: () => void;
}
export type CreateDataSourceType<RecordType> = {
  data: RecordType[];
  pagination: PaginationProps;
};

export interface CoreTableProps<RecordType>
  extends Omit<TableProps<RecordType>, 'dataSource'> {
  createDataSource?: (any) => Promise<CreateDataSourceType<RecordType>>;
  /** 过滤参数转换 */
  formFieldsTransform?: (any) => any;
  /* 是否展示序列号 */
  showSerialNumber?: boolean;
  /** 头部操作栏配置 */
  headerOperationBar?: React.ReactNode[];
  /** 头部搜索栏配置 */
  headerSearchBar?: HeaderSearchBarProps;
}

export type RefCoreTable = <RecordType extends object = any>(
  props: React.PropsWithChildren<CoreTableProps<RecordType>> & {
    ref?: React.Ref<CoreTableRef>;
  }
) => React.ReactElement;

function CoreTable<RecordType extends object = any>(
  props: CoreTableProps<RecordType>,
  ref: React.Ref<CoreTableRef>
) {
  const {
    createDataSource,
    columns,
    showSerialNumber,
    headerOperationBar,
    headerSearchBar,
    formFieldsTransform,
    pagination: paginationProps,
    size,
    ...restProps
  } = props;

  const [dataSource, setDataSource] = useState<RecordType[]>([]);
  const [pagination, setPagination] = useState<PaginationProps>({});
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [coreTableEleId] = useState(uuidv4);
  const [searchValue, setSearchValue] = useState<
    HeaderSearchBarProps['defaultValue']
  >(headerSearchBar?.defaultValue);
  const [coreTableScroll, setCoreTableScroll] = useState<
    TableProps<RecordType>['scroll']
  >({});

  const {
    token: {
      paddingXS,
      marginXS,
      marginXXS,
      colorBgElevated,
      fontSize,
      borderRadius,
      colorPrimary,
      colorBgLayout,
      colorBorderSecondary,
      colorText
    }
  } = useSiteToken();

  const getNextColums = useCallback(() => {
    return showSerialNumber && columns
      ? [
          {
            title: '序号',
            width: 75,
            render: (...rest) => <span>{rest[2] + 1}</span>
          },
          ...columns
        ]
      : columns;
  }, [showSerialNumber, columns]);

  const [nextColums] = useState(getNextColums());

  const getCoreTableScroll = useCallback(() => {
    const coreTableContent = document.getElementById(coreTableEleId);
    const tableHeaderHeight = size === 'small' ? 39 : 55;
    if (coreTableContent) {
      setCoreTableScroll({
        y: coreTableContent.getBoundingClientRect().height - tableHeaderHeight
      });
    }
  }, [coreTableEleId, size]);

  const getCoreTableFormFields = useCallback(() => {
    const paginationFields = {
      pageSize:
        (paginationProps && paginationProps?.pageSize) ||
        DEFAULT_PAGINATION.pageSize,
      pageNum:
        (paginationProps && paginationProps?.current) ||
        DEFAULT_PAGINATION.current
    };
    const initialFormFields: FormFieldsProps = {
      search: headerSearchBar?.defaultValue,
      ...paginationFields
    };

    return initialFormFields;
  }, [paginationProps, headerSearchBar?.defaultValue]);
  const tableFormFieldsRef = useRef(getCoreTableFormFields()); // 表格筛选字段，结合 createDataSource 使用

  const getTableDataSource = useCallback(async () => {
    let nextDataSource = EMPTY_LIST;
    let nextPagination = DEFAULT_PAGINATION;
    if (createDataSource) {
      setDataLoading(true);
      const { data, pagination: _pagination } = await createDataSource(
        formFieldsTransform?.(tableFormFieldsRef.current)
      );
      nextDataSource = data;
      nextPagination = _pagination;
    }
    setDataSource(nextDataSource);
    setPagination(nextPagination);
    setDataLoading(false);
  }, [createDataSource, formFieldsTransform]);

  const handleSearchBarSearch = useCallback(
    (value) => {
      tableFormFieldsRef.current.search = value ?? '';
      tableFormFieldsRef.current.pageNum = 1;
      getTableDataSource();
    },
    [getTableDataSource]
  );

  const handleSearchBarChange = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const handlePaginationChange = useCallback(
    (page, pageSize) => {
      tableFormFieldsRef.current.pageNum = page;
      tableFormFieldsRef.current.pageSize = pageSize;
      getTableDataSource();
    },
    [getTableDataSource]
  );

  const reloadData = useCallback(() => {
    setSearchValue('');
    handleSearchBarSearch('');
  }, [handleSearchBarSearch]);

  useImperativeHandle(
    ref,
    () => {
      return {
        reloadData
      };
    },
    [reloadData]
  );

  useEffect(() => {
    getTableDataSource();
    getCoreTableScroll();
  }, [getTableDataSource, getCoreTableScroll]);

  return (
    <div
      className={`${prefixCls}-core-table`}
      style={{
        backgroundColor: colorBgLayout,
        borderRadius,
        border: `1px solid ${colorBorderSecondary}`
      }}
    >
      <div
        className={`${prefixCls}-core-table-header`}
        style={{
          padding: `${paddingXS}px`,
          backgroundColor: colorBgElevated,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius
        }}
      >
        <div className={`${prefixCls}-core-table-header-options`}>
          {headerOperationBar?.map((item, index) => (
            <div
              className="header-operation-item"
              key={index}
              style={{
                marginLeft: `${index === 0 ? '0' : `${marginXS}px`}`
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div className={`${prefixCls}-core-table-header-search`}>
          <Input.Search
            value={searchValue}
            placeholder={headerSearchBar?.placeholder ?? DEFAULT_PLACEHOLDER}
            onSearch={handleSearchBarSearch}
            onChange={handleSearchBarChange}
            allowClear
          />
        </div>
      </div>
      <div
        className={`${prefixCls}-core-table-content`}
        id={coreTableEleId}
        style={{ margin: `${marginXXS}px 0`, backgroundColor: colorBgElevated }}
      >
        <Table<RecordType>
          {...restProps}
          size={size}
          pagination={false}
          loading={dataLoading}
          dataSource={dataSource}
          columns={nextColums}
          scroll={coreTableScroll}
        />
      </div>
      <div
        className={`${prefixCls}-core-table-footer`}
        style={{
          display:
            paginationProps === false || pagination.total === 0
              ? 'none'
              : 'flex',
          padding: `${paddingXS}px`,
          backgroundColor: colorBgElevated,
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius
        }}
      >
        <div style={{ fontSize, color: colorText }}>
          <span>共</span>
          <span
            style={{
              color: colorPrimary,
              margin: marginXXS,
              fontWeight: 'bold'
            }}
          >
            {pagination.total}
          </span>
          <span>条记录</span>
        </div>
        <div>
          <Pagination
            {...DEFAULT_PAGINATION}
            {...paginationProps}
            {...pagination}
            onChange={handlePaginationChange}
          />
        </div>
      </div>
    </div>
  );
}

const ForwardCoreTable = React.forwardRef<CoreTableRef>(
  CoreTable
) as any as RefCoreTable & {
  EllipsisContent: typeof EllipsisContent;
};

ForwardCoreTable.EllipsisContent = ForwardCoreTable;
export default ForwardCoreTable;
