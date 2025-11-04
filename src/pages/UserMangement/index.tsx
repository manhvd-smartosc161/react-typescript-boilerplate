import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageHeaderOrganism } from '@src/components/organisms';
import { TableOrganism } from '@src/components/organisms';
import { ActionButtonAtom } from '@src/components/atoms';
import { SortDirection, UserRolesItem } from '@src/types';

import { ESortDirection } from '@src/constants';
import { DATE_FORMATS, formatDate } from '@src/utils';
import TableToolbar from '@src/components/molecules/TableToolbar';
import { BulkActionItem } from '@src/components/molecules/TableToolbar/BulkActionMenu';
import { usersData } from '@src/mock/usersData';
import EditUserModal from '@src/components/organisms/EditUserModal';
type EditState = {
  open: boolean;
  data: UserRolesItem | null;
};
const UserManagement: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<SortDirection>(ESortDirection.ASC);
  const [orderBy, setOrderBy] = useState('displayName');
  const [query, setQuery] = useState('');
  const [editState, setEditState] = useState<EditState>({
    open: false,
    data: null,
  });
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);

  const data = usersData;
  const handleEditUser = (user: UserRolesItem) => {
    console.log(user, 'useruseruser');
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
      label: t('user:id'),
      isSortable: false,
    },
    {
      key: 'displayName' as keyof UserRolesItem,
      label: t('user:displayName'),
      isSortable: true,
    },
    {
      key: 'email' as keyof UserRolesItem,
      label: t('user:email'),
      isSortable: false,
    },
    {
      key: 'updatedAt' as keyof UserRolesItem,
      label: t('user:lastUpdated'),
      render: (value: string) =>
        formatDate(value, DATE_FORMATS.DISPLAY_DATE_FORMAT),
      isSortable: false,
    },
    {
      key: 'status' as keyof UserRolesItem,
      label: t('lead:status'),
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
      isSortable: false,
    },
  ];
  const actions: BulkActionItem[] = [
    {
      key: 'deactivate',
      label: 'Deactivate',
      onClick: async () => {
        alert('Deactive clicked');
      },
    },
    {
      key: 'activate',
      label: 'Activate',
      onClick: async () => {
        alert('activate clicked');
      },
    },
    {
      key: 'changeRole',
      label: 'Change Role',
      onClick: () => {
        alert('activate clicked');
      },
    },
  ];
  return (
    <Box>
      <PageHeaderOrganism title={t('user:userRoles')} />

      <Box sx={{ mt: 3 }}>
        <TableOrganism<UserRolesItem>
          tableTitle="User"
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
        <EditUserModal
          open={editState.open}
          data={editState.data}
          onClose={handleCloseEditUser}
        ></EditUserModal>
      )}
    </Box>
  );
};

export default UserManagement;
