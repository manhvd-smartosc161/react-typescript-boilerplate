import React, { useMemo, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { PageHeaderOrganism, TableOrganism } from '@src/components/organisms';
import { InputAtom, IconAtom } from '@src/components/atoms';
import { ESortDirection } from '@src/constants';
import { AuditLogItem } from '@src/types/auditLog';
import { useGetAuditLogs } from '@src/hooks';
import { useDebounce } from '@src/hooks/common';
import { formatDate } from '@src/utils/date';
import { AuditLog } from '@src/types/auditLog';

const AuditLogs: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<'asc' | 'desc'>(ESortDirection.DESC);
  const [orderBy, setOrderBy] = useState<keyof AuditLogItem>('timestamp');

  const searchParams = useMemo(() => {
    return {
      page: currentPage,
      limit: rowsPerPage,
      orderBy,
      order,
      ...(debouncedSearchKeyword && { keyword: debouncedSearchKeyword }),
    };
  }, [currentPage, rowsPerPage, orderBy, order, debouncedSearchKeyword]);

  const { data, isLoading, isError } = useGetAuditLogs(searchParams);

  // Transform API data to component format
  const transformedData = useMemo(() => {
    if (!data?.items) return [];

    return data.items.map((item: AuditLog): AuditLogItem => {
      // Format timestamp
      const timestamp = formatDate(item.timestamp, 'YYYY-MM-DD HH:mm');

      return {
        id: item.id,
        timestamp,
        user: item.userEmail || item.user || '',
        role: item.role || '',
        action: item.action || '',
        menu: item.menu || '',
        details: item.details || '',
      };
    });
  }, [data]);

  const total = data?.pagination?.total || 0;
  const pagesCount = data?.pagination?.pagesCount || 0;

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

  const renderLoading = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 400,
        }}
      >
        <CircularProgress />
      </Box>
    );
  };

  const renderError = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 400,
        }}
      >
        <Box>Error loading audit logs. Please try again.</Box>
      </Box>
    );
  };

  const renderTable = () => {
    return (
      <TableOrganism<AuditLogItem>
        columns={columns}
        data={transformedData}
        rowKey="id"
        order={order}
        orderBy={orderBy}
        pagination={{
          currentPage,
          rowsPerPage,
          total,
          pagesCount,
          hasMore: data?.pagination?.hasMore || false,
        }}
        onChangePage={(page) => setCurrentPage(page)}
        onChangeRowsPerPage={(size) => {
          setRowsPerPage(size);
          setCurrentPage(1);
        }}
        onRequestSort={handleRequestSort}
      />
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return renderLoading();
    }

    if (isError) {
      return renderError();
    }

    return renderTable();
  };

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
        {renderContent()}
      </Box>
    </Box>
  );
};

export default AuditLogs;
