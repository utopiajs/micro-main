// based on antd table
import { COMPONENT_CLASSNAME_PREFIX } from '@/constants/component';
import { useSiteToken } from '@utopia/micro-main-utils';
import type { PaginationProps, TableProps } from 'antd';
import { Button, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import './index.less';

const prefixCls = COMPONENT_CLASSNAME_PREFIX;

type CreateDataSourceType<RecordType> = {
  data: RecordType[];
  pagination?: PaginationProps;
};

export interface CoreTableProps<RecordType>
  extends Omit<TableProps<RecordType>, 'dataSource'> {
  createDataSource?: () => Promise<CreateDataSourceType<RecordType>>;
  /* 是否展示序列号 */
  showSerialNumber?: boolean;
}

function CoreTable<RecordType extends object = any>(
  props: CoreTableProps<RecordType>
) {
  const {
    createDataSource = () => ({ data: [] }),
    columns,
    showSerialNumber,
    ...restProps
  } = props;

  const [dataSource, setDataSource] = useState<RecordType[]>([]);
  const {
    token: { paddingXS, marginXS }
  } = useSiteToken();

  const getTableDataSource = useCallback(async () => {
    const { data } = await createDataSource();
    setDataSource(data);
  }, [createDataSource]);

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

  useEffect(() => {
    getTableDataSource();
  }, [getTableDataSource]);

  return (
    <div className={`${prefixCls}-core-table`}>
      <div
        className={`${prefixCls}-core-table-header`}
        style={{ padding: `${paddingXS}px 0`, marginBottom: marginXS }}
      >
        <Button>新增</Button>
        <Button>编辑</Button>
      </div>
      <div className={`${prefixCls}-core-table-content`}>
        <Table<RecordType>
          {...restProps}
          pagination={false}
          dataSource={dataSource}
          columns={nextColums}
        />
      </div>
      <div className={`${prefixCls}-core-table-footer`}>footer</div>
    </div>
  );
}

export default CoreTable;
