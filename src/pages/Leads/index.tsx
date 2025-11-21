import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, generatePath } from 'react-router-dom';
import { PageHeaderOrganism } from '@src/components/organisms';
import { TableOrganism } from '@src/components/organisms';
import { StatusChipAtom, ActionButtonAtom } from '@src/components/atoms';
import { SortDirection, SupplierInfoItem } from '@src/types';
import { useGetSuppliers } from '@src/hooks/supplier/useGetSuppliers';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '@src/stores';
import { ESortDirection, LANGUAGE_CODES } from '@src/constants';
import { DATE_FORMATS, formatDate } from '@src/utils';
import { AddLeadModalOrganism } from '@src/components/organisms';
import ROUTES from '@src/routes/route';

const LeadsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<SortDirection>(ESortDirection.ASC);
  const [orderBy, setOrderBy] = useState('name_en');
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const currentUser = useRecoilValue(currentUserState);

  const { data } = useGetSuppliers({
    page: currentPage,
    limit: rowsPerPage,
    sortBy: orderBy,
    sortOrder: order,
  });

  const handleViewDetails = (id: string) => {
    navigate(generatePath(ROUTES.LEAD_DETAIL, { id }));
  };

  const handleClickAddLead = () => {
    setOpenAddModal(true);
  };
  const handleCloseAddNewLead = () => {
    setOpenAddModal(false);
  };

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof SupplierInfoItem,
  ) => {
    const isAsc = orderBy === property && order === ESortDirection.ASC;
    setOrder(isAsc ? ESortDirection.DESC : ESortDirection.ASC);
    setOrderBy(property);
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
      key: 'id' as keyof SupplierInfoItem,
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
      <AddLeadModalOrganism
        open={openAddModal}
        onClose={handleCloseAddNewLead}
        onSubmit={() => {}}
      />
    </Box>
  );
};

export default LeadsPage;
