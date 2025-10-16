import React from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Pagination,
} from '@mui/material';
import {
  StyledTableContainer,
  StyledTableHead,
  StyledTableCell,
  StyledTableRow,
} from './index.styled';

export interface Column<T = any> {
  key: keyof T;
  label: string;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface TableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  pagination?: {
    current: number;
    total: number;
    pageSize?: number;
    onChange: (page: number) => void;
  };
  rowKey?: keyof T;
  onRowClick?: (record: T, index: number) => void;
}

const TableOrganism = <T,>({
  columns,
  data,
  loading = false,
  pagination,
  rowKey = 'id' as keyof T,
  onRowClick,
}: TableProps<T>) => {
  const handleRowClick = (record: T, index: number) => {
    if (onRowClick) {
      onRowClick(record, index);
    }
  };

  const renderCellContent = (column: Column<T>, record: T, index: number) => {
    if (column.render) {
      return column.render(record[column.key], record, index);
    }
    return String(record[column.key]);
  };

  const renderTableHeader = () => {
    return (
      <StyledTableHead>
        <TableRow>
          {columns.map((column) => (
            <StyledTableCell
              key={String(column.key)}
              align={column.align || 'left'}
              style={{ width: column.width }}
            >
              {column.label}
            </StyledTableCell>
          ))}
        </TableRow>
      </StyledTableHead>
    );
  };

  const renderTableBody = () => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} align="center">
            Loading...
          </TableCell>
        </TableRow>
      );
    }

    return data.map((record, index) => (
      <StyledTableRow
        key={String(record[rowKey] || index)}
        onClick={() => handleRowClick(record, index)}
        style={{ cursor: onRowClick ? 'pointer' : 'default' }}
      >
        {columns.map((column) => (
          <TableCell key={String(column.key)} align={column.align || 'left'}>
            {renderCellContent(column, record, index)}
          </TableCell>
        ))}
      </StyledTableRow>
    ));
  };

  const renderPagination = () => {
    if (!pagination) {
      return null;
    }

    const totalPages = Math.ceil(
      pagination.total / (pagination.pageSize || 10),
    );

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={totalPages}
          page={pagination.current}
          onChange={(event, page) => pagination.onChange(page)}
          color="primary"
          showFirstButton
          showLastButton
          siblingCount={1}
          boundaryCount={1}
          size="small"
        />
      </Box>
    );
  };

  return (
    <Box>
      <StyledTableContainer>
        <Table>
          {renderTableHeader()}
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </StyledTableContainer>
      {renderPagination()}
    </Box>
  );
};

export default TableOrganism;
