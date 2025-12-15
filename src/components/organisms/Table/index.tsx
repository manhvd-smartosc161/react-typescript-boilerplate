import React, { useState } from 'react';
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
  Checkbox,
  SxProps,
  Theme,
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
import TableHeader from '../../molecules/TableHeader';
import { IconName } from '@src/components/atoms/Icon';
import { ESortDirection } from '@src/constants';
import { useTranslation } from 'react-i18next';

export interface Column<T = any> {
  key: keyof T;
  label: string | React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  isSortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
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
  selectable?: boolean;
  selectedRows?: Array<string | number>;
  onSelectedRowsChange?: (keys: Array<string | number>, records: T[]) => void;
  toolbar?: React.ReactNode;
  style?: SxProps<Theme>;
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
  selectable = false,
  selectedRows: selectedRowsProp,
  onSelectedRowsChange,
  toolbar,
  style,
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

  // Returns a stable row ID (string or number) based on rowKey.
  // Falls back to index if no valid key is found.
  const getRowId = (record: T, index: number): string | number => {
    const val = (record as any)?.[rowKey];
    if (val === undefined || val === null) return index;
    return typeof val === 'string' || typeof val === 'number'
      ? val
      : String(val);
  };

  // Emits selection changes to parent, including both selected IDs and selected row objects.
  const emitSelection = (selected: Array<string | number>) => {
    onSelectedRowsChange?.(
      selected,
      data.filter((r, idx) => selected.includes(getRowId(r, idx))),
    );
  };

  // Supports both controlled and uncontrolled selection states.
  const isControlled = selectedRowsProp !== undefined;
  const [internalSelected, setInternalSelected] = useState<
    Array<string | number>
  >([]);
  const selectedRows = isControlled
    ? (selectedRowsProp as Array<string | number>)
    : internalSelected;

  // Updates selected keys (supports direct update or updater function).
  // Calls emitSelection to notify parent about selection change.
  const setSelectedRows = (
    updater:
      | Array<string | number>
      | ((prev: Array<string | number>) => Array<string | number>),
  ) => {
    const next =
      typeof updater === 'function' ? (updater as any)(selectedRows) : updater;
    if (!isControlled) setInternalSelected(next);
    emitSelection(next);
  };

  // calculate Select All states
  const pageRowIds = data.map((r, idx) => getRowId(r, idx));
  const selectedAll =
    pageRowIds.length > 0 && selectedRows.length === pageRowIds.length;
  const somePageSelected = selectedRows.length > 0 && !selectedAll;

  const onSelectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (checked) {
      const merged = Array.from(new Set([...selectedRows, ...pageRowIds]));
      setSelectedRows(merged);
    } else {
      const left = selectedRows.filter((k) => !pageRowIds.includes(k));
      setSelectedRows(left);
    }
  };

  const onRowCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    record: T,
    index: number,
  ) => {
    e.stopPropagation();
    const id = getRowId(record, index);

    if (e.target.checked) {
      setSelectedRows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    } else {
      setSelectedRows((prev) => prev.filter((k) => k !== id));
    }
  };

  const renderTableHeader = () => {
    return (
      <StyledTableHead>
        <TableRow>
          {selectable && (
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={somePageSelected}
                checked={selectedAll}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all rows' }}
              />
            </TableCell>
          )}
          {columns.map((column) => (
            <StyledTableCell
              key={String(column.key)}
              align={column.align || 'left'}
              style={{ width: column.width }}
              sortDirection={order && column.isSortable ? order : false}
            >
              {column.renderHeader ? (
                column.renderHeader()
              ) : column.isSortable ? (
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
    if (data.length === 0) {
      return (
        <TableCell colSpan={columns.length + (selectable ? 1 : 0)}>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ py: 3 }}
          >
            {t('common:noDataToDisplay')}
          </Typography>
        </TableCell>
      );
    }

    return data.map((record, index) => {
      const id = getRowId(record, index);
      const isItemSelected = selectedRows.includes(id);
      const labelId = `enhanced-table-checkbox-${index}`;
      return (
        <StyledTableRow
          key={String(record[rowKey] || index)}
          onClick={() => handleRowClick(record, index)}
          style={{ cursor: onRowClick ? 'pointer' : 'default' }}
        >
          {selectable && (
            <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
              <Checkbox
                color="primary"
                checked={isItemSelected}
                onChange={(e) => onRowCheckboxChange(e, record, index)}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </TableCell>
          )}
          {columns.map((column) => (
            <TableCell key={String(column.key)} align={column.align || 'left'}>
              {renderCellContent(column, record, index)}
            </TableCell>
          ))}
        </StyledTableRow>
      );
    });
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
    <StyledTableContainer sx={style}>
      {tableTitle && (
        <TableHeader tableIcon={tableIcon} tableTitle={tableTitle} />
      )}
      {toolbar}
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
