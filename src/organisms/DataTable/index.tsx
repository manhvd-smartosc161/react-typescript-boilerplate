import { FC } from 'react';
import { Table, TableProps } from 'antd';
import { Card } from '@src/atoms';
import { StyledDataTable } from './index.styled';

export interface DataTableProps<T = any> extends TableProps<T> {
  variant?: 'default' | 'striped' | 'bordered';
  cardTitle?: string;
  cardExtra?: React.ReactNode;
}

const DataTable: FC<DataTableProps> = ({
  variant = 'default',
  cardTitle,
  cardExtra,
  ...tableProps
}) => {
  const table = (
    <StyledDataTable $variant={variant}>
      <Table
        {...tableProps}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          ...tableProps.pagination,
        }}
      />
    </StyledDataTable>
  );

  if (cardTitle || cardExtra) {
    return (
      <Card title={cardTitle} extra={cardExtra}>
        {table}
      </Card>
    );
  }

  return table;
};

export default DataTable;
