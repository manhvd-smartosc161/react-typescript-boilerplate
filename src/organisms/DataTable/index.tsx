import { FC, ReactNode } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Card, Box } from '@mui/material';

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
    <Box sx={{ p: 1 }}>
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
    </Box>
  );

  if (cardTitle || cardExtra) {
    return (
      <Card>
        {(cardTitle || cardExtra) && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 2,
              p: 2,
            }}
          >
            {cardTitle && (
              <Box sx={{ fontSize: '1.25rem', fontWeight: 600 }}>
                {cardTitle}
              </Box>
            )}
            {cardExtra}
          </Box>
        )}
        {table}
      </Card>
    );
  }

  return table;
};

export default DataTable;
