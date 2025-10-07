import { FC, ReactNode } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Card } from '@mui/material';
import {
  StyledDataTableContainer,
  StyledCardHeader,
  StyledCardTitle,
} from './index.styled';

export interface DataTableProps {
  columns: GridColDef[];
  dataSource?: any[];
  cardTitle?: string;
  cardExtra?: ReactNode;
  pagination?: boolean;
  loading?: boolean;
}

const DataTable: FC<DataTableProps> = ({
  cardTitle,
  cardExtra,
  dataSource = [],
  columns,
  pagination = true,
  loading = false,
  ...tableProps
}) => {
  const table = (
    <StyledDataTableContainer>
      <DataGrid
        rows={dataSource}
        columns={columns}
        loading={loading}
        pageSizeOptions={pagination ? [5, 10, 25] : []}
        initialState={{
          pagination: {
            paginationModel: { pageSize: pagination ? 10 : 100 },
          },
        }}
        {...tableProps}
      />
    </StyledDataTableContainer>
  );

  if (cardTitle || cardExtra) {
    return (
      <Card>
        {(cardTitle || cardExtra) && (
          <StyledCardHeader>
            {cardTitle && <StyledCardTitle>{cardTitle}</StyledCardTitle>}
            {cardExtra}
          </StyledCardHeader>
        )}
        {table}
      </Card>
    );
  }

  return table;
};

export default DataTable;
