import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import {
  PageHeaderOrganism,
  TableOrganism,
  EditRolePermissionModalOrganism,
  AddRoleModalOrganism,
  EditRoleModalOrganism,
} from '@src/components/organisms';
import { ActionButtonAtom, IconAtom } from '@src/components/atoms';
import { SortDirection, RolePermissionItem, RoleDetailData } from '@src/types';
import { ESortDirection, EStatusUpdate } from '@src/constants';
import { TableToolbar } from '@src/components/molecules';
import { BulkActionItem } from '@src/components/molecules/TableToolbar/BulkActionMenu';
import { AutocompleteOption } from '@src/components/atoms/Autocomplete';
import { StyledActionIconButton } from '../Contracts/index.styled';
import {
  useBulkUpdateRoleStatusMutation,
  useCreateRoleMutation,
  useGetRoles,
} from '@src/hooks/role';

type EditState = {
  open: boolean;
  data: RolePermissionItem | null;
};

const RolesPermission: React.FC = () => {
  const { t } = useTranslation('role');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<SortDirection>(ESortDirection.ASC);
  const [orderBy, setOrderBy] = useState('name');
  const [query, setQuery] = useState('');
  const [editState, setEditState] = useState<EditState>({
    open: false,
    data: null,
  });
  const [addModal, setAddModal] = useState({
    open: false,
  });
  const [editPermissionModal, setEditPermissionModal] = useState({
    open: false,
  });
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);
  const searchParams = {
    page: currentPage,
    limit: rowsPerPage,
    sortBy: orderBy,
    sortOrder: order,
    searchTerms: query,
  };
  const { data } = useGetRoles(searchParams);
  const createRoleMutation = useCreateRoleMutation(searchParams).mutateAsync;
  const bulkUpdateStatusMutation =
    useBulkUpdateRoleStatusMutation().mutateAsync;

  const handleEditRole = (role: RolePermissionItem) => {
    setEditState({
      open: true,
      data: role,
    });
  };

  const handleCloseEditRole = () => {
    setEditState({
      open: false,
      data: null,
    });
  };
  const handleAddRole = () => {
    setAddModal({
      open: true,
    });
  };

  const handleCloseAddRole = () => {
    setAddModal({
      open: false,
    });
  };

  const handleSubmitAddRole = async (formData: RoleDetailData) => {
    await createRoleMutation(formData);
    handleCloseAddRole();
  };

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof RolePermissionItem,
  ) => {
    const isAsc = orderBy === property && order === ESortDirection.ASC;
    setOrder(isAsc ? ESortDirection.DESC : ESortDirection.ASC);
    setOrderBy(property);
  };

  const handleBulkUpdateStatus = async (action: EStatusUpdate) => {
    await bulkUpdateStatusMutation({
      roleIds: selectedRows.map((el) => el.toString()),
      status: action,
    });
  };

  const actions: BulkActionItem[] = [
    {
      key: 'deactivate',
      label: t('deactivate'),
      onClick: async () => {
        handleBulkUpdateStatus(EStatusUpdate.INACTIVE);
      },
    },
    {
      key: 'activate',
      label: t('activate'),
      onClick: async () => {
        handleBulkUpdateStatus(EStatusUpdate.ACTIVE);
      },
    },
    {
      key: 'delete',
      label: t('delete'),
      onClick: () => {
        handleBulkUpdateStatus(EStatusUpdate.DELETED);
      },
    },
  ];

  const columns = [
    {
      key: 'id' as keyof RolePermissionItem,
      label: t('id'),
      isSortable: false,
    },
    {
      key: 'displayName' as keyof RolePermissionItem,
      label: t('roleName'),
      isSortable: true,
    },
    {
      key: 'description' as keyof RolePermissionItem,
      label: t('description'),
      isSortable: false,
    },
    {
      key: 'retailerType' as keyof RolePermissionItem,
      label: t('retailerName'),
      render: (value: AutocompleteOption[]) => value?.map((r) => r).join(', '),
      isSortable: false,
    },
    {
      key: 'status' as keyof RolePermissionItem,
      label: t('status'),
      render: (value: string) => t(`common:status.${value.toLowerCase()}`),
    },
    {
      key: 'id' as keyof RolePermissionItem,
      label: t('edit'),
      width: '120px',
      align: 'center' as const,
      render: (_value: string, record: RolePermissionItem) => (
        <StyledActionIconButton>
          <IconAtom
            name="edit"
            size={20}
            onClick={() => handleEditRole(record)}
          />
        </StyledActionIconButton>
      ),
      isSortable: false,
    },
    {
      key: 'id' as keyof RolePermissionItem,
      label: t('permission'),
      width: '120px',
      align: 'center' as const,
      render: () => (
        <StyledActionIconButton>
          <IconAtom
            name="edit"
            size={20}
            onClick={() => setEditPermissionModal({ open: true })}
          />
        </StyledActionIconButton>
      ),
      isSortable: false,
    },
  ];

  return (
    <Box>
      <PageHeaderOrganism
        title={t('rolesPermission')}
        trailing={
          <ActionButtonAtom variant="detail-report" onClick={handleAddRole}>
            {t('addRole')}
          </ActionButtonAtom>
        }
      />

      <Box sx={{ mt: 3 }}>
        <TableOrganism<RolePermissionItem>
          tableTitle={t('rolesPermission')}
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
        <EditRoleModalOrganism
          open={editState.open}
          data={editState?.data}
          onClose={handleCloseEditRole}
        ></EditRoleModalOrganism>
      )}
      {addModal.open && (
        <AddRoleModalOrganism
          open={addModal.open}
          onClose={handleCloseAddRole}
          onSubmit={handleSubmitAddRole}
        ></AddRoleModalOrganism>
      )}
      {editPermissionModal.open && (
        <EditRolePermissionModalOrganism
          open={editPermissionModal.open}
          onClose={() => setEditPermissionModal({ open: false })}
        />
      )}
    </Box>
  );
};

export default RolesPermission;
