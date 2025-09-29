import { FC } from 'react';
import { Table, TableProps } from 'antd';
import { StyledDataTable } from './index.styled';

interface DataTableProps<T = any> extends TableProps<T> {
  variant?: 'default' | 'striped' | 'bordered';
}

const DataTable: FC<DataTableProps> = ({ variant = 'default', ...props }) => {
  return (
    <StyledDataTable $variant={variant}>
      <Table
        {...props}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          ...props.pagination,
        }}
      />
    </StyledDataTable>
  );
};

export default DataTable;
