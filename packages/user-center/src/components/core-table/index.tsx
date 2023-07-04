// based on antd table
import { COMPONENT_CLASSNAME_PREFIX } from '@/constants/component';
import { useSiteToken } from '@utopia/micro-main-utils';
import { Input, Pagination, PaginationProps, Table, TableProps } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import './index.less';

const prefixCls = COMPONENT_CLASSNAME_PREFIX;
const EMPTY_LIST: any[] = [];
const EMPTY_PAGINATION: PaginationProps = {};
const coreTableEleId = 'core-table-id';
const DEFAULT_PLACEHOLDER = '请输入...';

interface HeaderSearchBarProps {
  placeholder?: string;
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

function CoreTable<RecordType extends object = any>(
  props: CoreTableProps<RecordType>
) {
  const {
    createDataSource,
    columns,
    showSerialNumber,
    headerOperationBar,
    headerSearchBar,
    formFieldsTransform,
    ...restProps
  } = props;

  const [dataSource, setDataSource] = useState<RecordType[]>([]);
  const [pagination, setPagination] = useState<PaginationProps>({});
  const [coreTableScroll, setCoreTableScroll] = useState<
    TableProps<RecordType>['scroll']
  >({});
  const tableFormFieldsRef = useRef({}); // 表格筛选字段，结合 createDataSource 使用
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

  const getTableDataSource = useCallback(async () => {
    let nextDataSource = EMPTY_LIST;
    let nextPagination = EMPTY_PAGINATION;
    if (createDataSource) {
      const { data, pagination: _pagination } = await createDataSource(
        formFieldsTransform?.(tableFormFieldsRef.current)
      );
      nextDataSource = data;
      nextPagination = _pagination;
    }
    setDataSource(nextDataSource);
    setPagination(nextPagination);
  }, [createDataSource, formFieldsTransform]);

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
    if (coreTableContent) {
      setCoreTableScroll({
        y: coreTableContent.getBoundingClientRect().height - 55
      });
    }
  }, []);

  const handleSearchBarSearch = useCallback(
    (value) => {
      tableFormFieldsRef.current = {
        search: value ?? ''
      };
      getTableDataSource();
    },
    [getTableDataSource]
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
                marginLeft: `${index === 0 ? '0' : `${marginXS}`}`
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div className={`${prefixCls}-core-table-header-search`}>
          <Input.Search
            placeholder={headerSearchBar?.placeholder ?? DEFAULT_PLACEHOLDER}
            onSearch={handleSearchBarSearch}
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
          pagination={false}
          dataSource={dataSource}
          columns={nextColums}
          scroll={coreTableScroll}
        />
      </div>
      <div
        className={`${prefixCls}-core-table-footer`}
        style={{
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
          <Pagination showQuickJumper showSizeChanger {...pagination} />
        </div>
      </div>
    </div>
  );
}

export default CoreTable;
