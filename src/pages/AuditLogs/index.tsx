import React, { useState } from 'react';
import { Box } from '@mui/material';
import { PageHeaderOrganism, TableOrganism } from '@src/components/organisms';
import { InputAtom, IconAtom } from '@src/components/atoms';
import { ESortDirection } from '@src/constants';
import { auditLogsData, AuditLogItem } from '@src/mock/auditLogsData';

const AuditLogs: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<'asc' | 'desc'>(ESortDirection.ASC);
  const [orderBy, setOrderBy] = useState<keyof AuditLogItem>('id');

  // TODO: Filter will be handled by API call
  const filteredData = auditLogsData;

  const total = filteredData.length;
  const pagesCount = Math.ceil(total / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof AuditLogItem,
  ) => {
    const isAsc = orderBy === property && order === ESortDirection.ASC;
    setOrder(isAsc ? ESortDirection.DESC : ESortDirection.ASC);
    setOrderBy(property);
  };

  const columns = [
    {
      key: 'id' as keyof AuditLogItem,
      label: 'ID',
      width: '5%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'timestamp' as keyof AuditLogItem,
      label: 'Timestamp',
      width: '15%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'user' as keyof AuditLogItem,
      label: 'User',
      width: '18%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'role' as keyof AuditLogItem,
      label: 'Role',
      width: '12%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'action' as keyof AuditLogItem,
      label: 'Action',
      width: '10%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'menu' as keyof AuditLogItem,
      label: 'Menu',
      width: '18%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'details' as keyof AuditLogItem,
      label: 'Details',
      width: '22%',
      align: 'left' as const,
      isSortable: false,
    },
  ];

  return (
    <Box>
      <PageHeaderOrganism title="Audit Logs" />
      <Box sx={{ mt: 3 }}>
        <Box sx={{ mb: 2 }}>
          <InputAtom
            placeholder="Search keyword"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            endIcon={<IconAtom name="search" size={20} />}
            fullWidth={false}
            sx={{ maxWidth: 400 }}
          />
        </Box>
        <TableOrganism<AuditLogItem>
          columns={columns}
          data={paginatedData}
          rowKey="id"
          order={order}
          orderBy={orderBy}
          pagination={{
            currentPage,
            rowsPerPage,
            total,
            pagesCount,
            hasMore: false,
          }}
          onChangePage={(page) => setCurrentPage(page)}
          onChangeRowsPerPage={(size) => {
            setRowsPerPage(size);
            setCurrentPage(1);
          }}
          onRequestSort={handleRequestSort}
        />
      </Box>
    </Box>
  );
};

export default AuditLogs;
