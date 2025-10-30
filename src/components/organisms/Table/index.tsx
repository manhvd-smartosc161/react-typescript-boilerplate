import React from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Pagination,
  Typography,
  Select,
  MenuItem,
  TableContainer,
  TableSortLabel,
} from '@mui/material';
import {
  StyledTableContainer,
  StyledTableHead,
  StyledTableCell,
  StyledTableRow,
  StyledTableFooter,
  StyledTablePagination,
  StyledLoadMore,
} from './index.styled';
import TableHeader from '../TableHeader';
import { IconName } from '@src/components/atoms/Icon';
import { ESortDirection } from '@src/constants';
import { useTranslation } from 'react-i18next';

export interface Column<T = any> {
  key: keyof T;
  label: string;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  isSortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface TableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  pagination?: {
    currentPage: number;
    pagesCount?: number;
    rowsPerPage?: number;
    total: number;
    hasMore?: boolean;
  };
  rowKey?: keyof T;
  tableTitle?: string;
  tableIcon?: IconName;
  order?: 'asc' | 'desc';
  orderBy?: string;
  onRowClick?: (record: T, index: number) => void;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (size: number) => void;
  onRequestSort?: (event: React.MouseEvent<unknown>, property: keyof T) => void;
}

const TableOrganism = <T,>({
  columns,
  data,
  loading = false,
  pagination,
  rowKey = 'id' as keyof T,
  tableTitle,
  tableIcon,
  order,
  orderBy,
  onRowClick,
  onChangePage = () => {},
  onChangeRowsPerPage = () => {},
  onRequestSort,
}: TableProps<T>) => {
  const { t } = useTranslation();
  const handleRowClick = (record: T, index: number) => {
    if (onRowClick) {
      onRowClick(record, index);
    }
  };

  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      if (onRequestSort) onRequestSort(event, property);
    };
  const handleChangePage = (event: unknown, page: number) => {
    onChangePage(page);
  };

  const handleChangeRowsPerPage = (value: number) => {
    onChangePage(1);
    onChangeRowsPerPage(value);
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
              sortDirection={order && column.isSortable ? order : false}
            >
              {column.isSortable ? (
                <TableSortLabel
                  active={orderBy === column.key}
                  direction={
                    orderBy === column.key ? order : ESortDirection.ASC
                  }
                  onClick={createSortHandler(column.key)}
                >
                  {column.label}
                </TableSortLabel>
              ) : (
                column.label
              )}
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

    return (
      <StyledTableFooter>
        <Typography color="secondary">
          {pagination.total} {t('common:results')}
        </Typography>
        <StyledTablePagination>
          <Pagination
            count={pagination.pagesCount}
            page={pagination.currentPage}
            onChange={handleChangePage}
            color="primary"
            siblingCount={1}
            boundaryCount={1}
            size="small"
          />
          <Typography variant="body2" color="text.secondary">
            {t('common:rowsPerPage')}
          </Typography>
          <Select
            size="small"
            value={pagination.rowsPerPage}
            onChange={(e) => handleChangeRowsPerPage(Number(e.target.value))}
          >
            {[5, 10, 20, 50, 100].map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </Select>
        </StyledTablePagination>
        {pagination?.hasMore && (
          <StyledLoadMore
            onClick={() =>
              onChangeRowsPerPage((pagination?.rowsPerPage || 0) + 10)
            }
          >
            {t('common:loadMore')}
          </StyledLoadMore>
        )}
      </StyledTableFooter>
    );
  };

  return (
    <StyledTableContainer>
      {tableTitle && (
        <TableHeader tableIcon={tableIcon} tableTitle={tableTitle} />
      )}
      <Box padding={3}>
        <TableContainer>
          <Table>
            {renderTableHeader()}
            <TableBody>{renderTableBody()}</TableBody>
          </Table>
        </TableContainer>
        {renderPagination()}
      </Box>
    </StyledTableContainer>
  );
};

export default TableOrganism;
