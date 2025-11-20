import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  EditUserModalOrganism,
  PageHeaderOrganism,
  TableOrganism,
} from '@src/components/organisms';
import { ActionButtonAtom, StatusChipAtom } from '@src/components/atoms';
import { RoleItem, SortDirection, UserRolesItem } from '@src/types';
import { ESortDirection, EStatus } from '@src/constants';
import { DATE_FORMATS, formatDate } from '@src/utils';
import { TableToolbar } from '@src/components/molecules';
import { BulkActionItem } from '@src/components/molecules/TableToolbar/BulkActionMenu';
import { useGetUsers } from '@src/hooks';
import { EUserStatus } from '@src/constants/user';
import { useBulkUpdateUserStatusMutation } from '@src/hooks/user/useBulkUpdateUserStatusMutation';

type EditState = {
  open: boolean;
  data: UserRolesItem | null;
};

const UserManagement: React.FC = () => {
  const { t } = useTranslation('user');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<SortDirection>(ESortDirection.ASC);
  const [orderBy, setOrderBy] = useState('name');
  const [query, setQuery] = useState('');
  const [editState, setEditState] = useState<EditState>({
    open: false,
    data: null,
  });
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);
  const searchParams = {
    page: currentPage,
    limit: rowsPerPage,
    sortBy: orderBy,
    sortOrder: order,
    searchTerms: query,
  };
  const bulkUpdateUserStatusMutation =
    useBulkUpdateUserStatusMutation().mutateAsync;
  const { data } = useGetUsers(searchParams);

  const handleEditUser = (user: UserRolesItem) => {
    setEditState({
      open: true,
      data: user,
    });
  };

  const handleCloseEditUser = () => {
    setEditState({
      open: false,
      data: null,
    });
  };

  const handleBulkUpdateStatus = (status: number) => {
    bulkUpdateUserStatusMutation({
      status,
      userIds: selectedRows.map((el) => el.toString()),
    });
    setSelectedRows([]);
  };

  const actions: BulkActionItem[] = [
    {
      key: 'deactivate',
      label: t('deactivate'),
      onClick: async () => handleBulkUpdateStatus(EUserStatus.INACTIVE),
    },
    {
      key: 'activate',
      label: t('activate'),
      onClick: async () => handleBulkUpdateStatus(EUserStatus.ACTIVE),
    },
    {
      key: 'changeRole',
      label: t('changeRole'),
      onClick: () => {
        alert('The feature will be launched soon');
      },
    },
  ];

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof UserRolesItem,
  ) => {
    const isAsc = orderBy === property && order === ESortDirection.ASC;
    setOrder(isAsc ? ESortDirection.DESC : ESortDirection.ASC);
    setOrderBy(property);
  };

  const columns = [
    {
      key: 'id' as keyof UserRolesItem,
      label: t('id'),
      isSortable: false,
    },
    {
      key: 'name' as keyof UserRolesItem,
      label: t('displayName'),
      isSortable: true,
    },
    {
      key: 'email' as keyof UserRolesItem,
      label: t('email'),
      isSortable: true,
    },
    {
      key: 'updatedAt' as keyof UserRolesItem,
      label: t('lastUpdated'),
      render: (value: string) =>
        formatDate(value, DATE_FORMATS.DISPLAY_DATE_FORMAT),
      isSortable: true,
    },
    {
      key: 'role' as keyof UserRolesItem,
      label: t('role'),
      render: (value: RoleItem) => value?.name,
    },
    {
      key: 'status' as keyof UserRolesItem,
      label: t('lead:status'),
      render: (value: number) => (
        <StatusChipAtom
          status={
            value === EUserStatus.ACTIVE ? EStatus.ACTIVE : EStatus.INACTIVE
          }
        />
      ),
      isSortable: true,
    },
    {
      key: 'id' as keyof UserRolesItem,
      label: t('common:action'),
      width: '120px',
      align: 'center' as const,
      render: (_value: string, record: UserRolesItem) => (
        <ActionButtonAtom
          variant="details"
          onClick={() => handleEditUser(record)}
        >
          {t('common:edit')}
        </ActionButtonAtom>
      ),
    },
  ];

  return (
    <Box>
      <PageHeaderOrganism title={t('userRoles')} />

      <Box sx={{ mt: 3 }}>
        <TableOrganism<UserRolesItem>
          tableTitle={t('user')}
          columns={columns}
          data={data?.items || []}
          rowKey="id"
          order={order}
          orderBy={orderBy}
          pagination={{
            currentPage,
            rowsPerPage,
            total: data?.pagination?.total || 0,
            pagesCount: data?.pagination?.pagesCount || 0,
            hasMore: data?.pagination?.hasMore || false,
          }}
          onChangePage={(page) => setCurrentPage(page)}
          onChangeRowsPerPage={(size) => setRowsPerPage(size)}
          onRequestSort={handleRequestSort}
          selectable
          selectedRows={selectedRows}
          onSelectedRowsChange={(newKeys) => {
            setSelectedRows(newKeys);
          }}
          toolbar={
            <TableToolbar
              total={data?.pagination?.total}
              keyword={query}
              onKeywordChange={(kw) => setQuery(kw)}
              onClearSearch={() => setQuery('')}
              selectedCount={selectedRows.length}
              actions={actions}
              searchPlaceholder={t('common:searchKeyword')}
            />
          }
        />
      </Box>
      {editState.open && (
        <EditUserModalOrganism
          open={editState.open}
          data={editState.data}
          onClose={handleCloseEditUser}
        ></EditUserModalOrganism>
      )}
    </Box>
  );
};

export default UserManagement;
