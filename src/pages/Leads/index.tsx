import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, generatePath } from 'react-router-dom';
import {
  AssignLeadModalOrganism,
  PageHeaderOrganism,
} from '@src/components/organisms';
import { TableOrganism } from '@src/components/organisms';
import { StatusChipAtom, ActionButtonAtom } from '@src/components/atoms';
import { AddLeadFormValue, SortDirection, SupplierInfoItem } from '@src/types';
import { useGetSuppliers } from '@src/hooks/supplier/useGetSuppliers';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '@src/stores';
import { ESortDirection, LANGUAGE_CODES } from '@src/constants';
import { camelToSnake, DATE_FORMATS, formatDate } from '@src/utils';
import { AddLeadModalOrganism } from '@src/components/organisms';
import { useAddNewLeadMutation, useAssignLeadMutation } from '@src/hooks';

type AssignModalState = {
  isOpen: boolean;
  data: SupplierInfoItem | null;
};

import ROUTES from '@src/routes/route';

const LeadsPage: React.FC = () => {
  const { t } = useTranslation('lead');
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<SortDirection>(ESortDirection.DESC);
  const [orderBy, setOrderBy] = useState('created_at');
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openAssignModal, setOpenAssignModal] = useState<AssignModalState>({
    isOpen: false,
    data: null,
  });
  const currentUser = useRecoilValue(currentUserState);

  const { data } = useGetSuppliers({
    page: currentPage,
    limit: rowsPerPage,
    sortBy: orderBy,
    sortOrder: order,
  });

  const createSupplierMutation = useAddNewLeadMutation().mutateAsync;
  const assignLeadMuatation = useAssignLeadMutation().mutateAsync;

  const handleViewDetails = (id: string) => {
    navigate(generatePath(ROUTES.LEAD_DETAIL, { id }));
  };

  const handleAssignLead = (record: SupplierInfoItem) => {
    setOpenAssignModal({
      isOpen: true,
      data: record,
    });
  };

  const handleClickAddLead = () => {
    setOpenAddModal(true);
  };
  const handleCloseAddNewLead = () => {
    setOpenAddModal(false);
  };

  const handleSubmitAddNew = (newLead: AddLeadFormValue) => {
    createSupplierMutation({
      id: crypto.randomUUID(),
      nameTh: newLead.companyName,
      nameEn: newLead.companyName,
      annualRevenue: 0,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
      remark: newLead?.remarks,
      status: 'DRAFT',
    });
  };

  const handleCloseAssignModal = () => {
    setOpenAssignModal({
      isOpen: false,
      data: null,
    });
  };

  const handleSubmitAssignModal = (lead: SupplierInfoItem) => {
    assignLeadMuatation(lead);
  };

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof SupplierInfoItem,
  ) => {
    const propSnakeCase = camelToSnake(property);
    const isAsc = orderBy === propSnakeCase && order === ESortDirection.ASC;
    setOrder(isAsc ? ESortDirection.DESC : ESortDirection.ASC);
    setOrderBy(propSnakeCase);
  };

  const columns = [
    {
      key: `${currentUser?.language === LANGUAGE_CODES.EN ? 'nameEn' : 'nameTh'}` as keyof SupplierInfoItem,
      label: t('lead:company'),
      isSortable: true,
    },
    {
      key: 'contactPersonName' as keyof SupplierInfoItem,
      label: t('lead:customerName'),
      isSortable: false,
    },
    {
      key: 'annualRevenue' as keyof SupplierInfoItem,
      label: t('lead:annualRevenue'),
      render: (value: number) => `$${value}`,
      isSortable: false,
    },
    {
      key: 'createdAt' as keyof SupplierInfoItem,
      label: t('lead:date'),
      render: (value: string) =>
        formatDate(value, DATE_FORMATS.DISPLAY_DATE_FORMAT),
      isSortable: true,
    },
    {
      key: 'status' as keyof SupplierInfoItem,
      label: t('lead:status'),
      render: (value: string) =>
        value ? <StatusChipAtom status={value} size="small" /> : null,
      isSortable: true,
    },
    {
      key: 'remark' as keyof SupplierInfoItem,
      label: t('lead:remarks'),
      render: (value: string) => value || '-',
      isSortable: false,
    },
    {
      key: 'actions' as keyof SupplierInfoItem,
      label: t('common:actions'),
      width: '120px',
      align: 'center' as const,
      render: (value: number, record: SupplierInfoItem) => (
        <ActionButtonAtom
          variant="details"
          onClick={() => handleViewDetails(record.id)}
        >
          {t('common:details')}
        </ActionButtonAtom>
      ),
      isSortable: false,
    },
    {
      key: 'assign' as keyof SupplierInfoItem,
      label: t('assign'),
      width: '120px',
      align: 'center' as const,
      render: (value: any, record: SupplierInfoItem) => (
        <>
          {record?.isAssigned ? (
            <ActionButtonAtom variant="assigned">
              {t('assigned')}
            </ActionButtonAtom>
          ) : (
            <ActionButtonAtom
              variant="details"
              onClick={() => handleAssignLead(record)}
            >
              {t('assign')}
            </ActionButtonAtom>
          )}
        </>
      ),
      isSortable: false,
    },
  ];

  return (
    <Box>
      <PageHeaderOrganism
        title={t('supplier:supplierRegistrationLeads')}
        trailing={
          <ActionButtonAtom
            variant="detail-report"
            onClick={handleClickAddLead}
          >
            {t('supplier:addNewLead')}
          </ActionButtonAtom>
        }
      />

      <Box sx={{ mt: 3 }}>
        <TableOrganism<SupplierInfoItem>
          tableIcon="editNote"
          tableTitle="Detailed Report"
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
        />
      </Box>
      {openAddModal && (
        <AddLeadModalOrganism
          open={openAddModal}
          onClose={handleCloseAddNewLead}
          onSubmit={handleSubmitAddNew}
        />
      )}
      {openAssignModal.isOpen && (
        <AssignLeadModalOrganism
          open={openAssignModal.isOpen}
          onClose={handleCloseAssignModal}
          onSubmit={handleSubmitAssignModal}
          data={openAssignModal.data}
        />
      )}
    </Box>
  );
};

export default LeadsPage;
