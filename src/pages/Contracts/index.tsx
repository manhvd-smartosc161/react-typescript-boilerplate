import React, { useState, useMemo, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '@src/hooks/common';
import {
  PageHeaderOrganism,
  TableOrganism,
  ContractTerminationModalOrganism,
} from '@src/components/organisms';
import {
  IconAtom,
  CheckBoxAtom,
  StatusChipAtom,
  ButtonAtom,
} from '@src/components/atoms';
import { ModalDialog } from '@src/components/molecules';
import { ESortDirection } from '@src/constants';
import { contractsData, ContractItem } from '@src/mock/contractsData';
import { TerminationFormData } from '@src/components/organisms/ContractTerminationModal';
import {
  StyledContentContainer,
  StyledFiltersContainer,
  StyledContractIdLink,
  StyledCompanyNameText,
  StyledActionContainer,
  StyledActionIconButton,
  StyledActionDropdown,
  StyledSearchInput,
} from './index.styled';

const Contracts: React.FC = () => {
  const { t } = useTranslation();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<'asc' | 'desc'>(ESortDirection.ASC);
  const [orderBy, setOrderBy] = useState<keyof ContractItem>('id');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [actionValue, setActionValue] = useState('');
  const [isTerminationModalOpen, setIsTerminationModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [contracts, setContracts] = useState<ContractItem[]>(contractsData);
  const debouncedSearchKeyword = useDebounce(searchKeyword, 300);

  // Filter contracts based on search keyword
  const filteredData = useMemo(() => {
    if (!debouncedSearchKeyword.trim()) {
      return contracts;
    }

    const keyword = debouncedSearchKeyword.toLowerCase().trim();
    return contracts.filter((contract) => {
      return (
        contract.contractId.toLowerCase().includes(keyword) ||
        contract.companyName.toLowerCase().includes(keyword) ||
        contract.email.toLowerCase().includes(keyword) ||
        contract.leadOwner.toLowerCase().includes(keyword)
      );
    });
  }, [contracts, debouncedSearchKeyword]);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchKeyword]);

  const total = filteredData.length;
  const pagesCount = Math.ceil(total / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof ContractItem,
  ) => {
    const isAsc = orderBy === property && order === ESortDirection.ASC;
    setOrder(isAsc ? ESortDirection.DESC : ESortDirection.ASC);
    setOrderBy(property);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const currentPageIds = paginatedData.map((item) => item.id);
      setSelectedRows([...new Set([...selectedRows, ...currentPageIds])]);
    } else {
      const currentPageIds = paginatedData.map((item) => item.id);
      setSelectedRows(
        selectedRows.filter((id) => !currentPageIds.includes(id)),
      );
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const handleActivate = () => {
    setContracts((prevContracts) =>
      prevContracts.map((contract) =>
        selectedRows.includes(contract.id)
          ? { ...contract, status: 'Active' as const }
          : contract,
      ),
    );
    toast.success(
      t('contract:activatedSuccess', { count: selectedRows.length }),
    );
    setSelectedRows([]);
    setActionValue('');
  };

  const handleDeleteConfirm = () => {
    setContracts((prevContracts) =>
      prevContracts.filter((contract) => !selectedRows.includes(contract.id)),
    );
    toast.success(t('contract:deletedSuccess', { count: selectedRows.length }));
    setSelectedRows([]);
    setActionValue('');
    setIsDeleteConfirmOpen(false);
  };

  const handleDelete = () => {
    setIsDeleteConfirmOpen(true);
  };

  const handleTerminationSubmit = (data: TerminationFormData) => {
    const selectedContracts = filteredData.filter((item) =>
      selectedRows.includes(item.id),
    );
    console.log('Terminate contracts:', {
      contracts: selectedContracts,
      formData: data,
    });

    // Update status to Inactive
    setContracts((prevContracts) =>
      prevContracts.map((contract) =>
        selectedRows.includes(contract.id)
          ? { ...contract, status: 'Inactive' as const }
          : contract,
      ),
    );

    toast.success(
      t('contract:terminatedSuccess', { count: selectedRows.length }),
    );

    setSelectedRows([]);
    setActionValue('');
  };

  const handleActionChange = (value: string) => {
    if (!value) return;

    setActionValue(value);

    if (selectedRows.length > 0) {
      if (value === 'terminate') {
        setIsTerminationModalOpen(true);
      } else if (value === 'activate') {
        handleActivate();
      } else if (value === 'delete') {
        handleDelete();
      }
    }
  };

  const selectedContracts = filteredData.filter((item) =>
    selectedRows.includes(item.id),
  );

  const handleDownload = async () => {
    try {
      const response = await fetch('/contract.pdf');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'contract.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading contract:', error);
      toast.error(t('contract:downloadError'));
    }
  };

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((item) => selectedRows.includes(item.id));
  const isIndeterminate =
    selectedRows.length > 0 && selectedRows.length < paginatedData.length;

  const columns = [
    {
      key: 'id' as keyof ContractItem,
      label: '',
      width: '5%',
      align: 'left' as const,
      isSortable: false,
      render: (_value: any, record: ContractItem) => (
        <CheckBoxAtom
          checked={selectedRows.includes(record.id)}
          onChange={(e) => handleSelectRow(record.id, e.target.checked)}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    {
      key: 'contractId' as keyof ContractItem,
      label: t('contract:id'),
      width: '15%',
      align: 'left' as const,
      isSortable: true,
      render: (_value: any, record: ContractItem) => (
        <StyledContractIdLink
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            // TODO: Navigate to contract details
            console.log('View contract:', record.contractId);
          }}
        >
          {record.contractId}
        </StyledContractIdLink>
      ),
    },
    {
      key: 'companyName' as keyof ContractItem,
      label: t('contract:supplierName'),
      width: '18%',
      align: 'left' as const,
      isSortable: true,
      render: (_value: any, record: ContractItem) => (
        <StyledCompanyNameText>{record.companyName}</StyledCompanyNameText>
      ),
    },
    {
      key: 'email' as keyof ContractItem,
      label: t('contract:email'),
      width: '15%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'startDate' as keyof ContractItem,
      label: t('contract:startDate'),
      width: '12%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'endDate' as keyof ContractItem,
      label: t('contract:endDate'),
      width: '12%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'leadOwner' as keyof ContractItem,
      label: t('contract:leadOwner'),
      width: '15%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'status' as keyof ContractItem,
      label: t('contract:status'),
      width: '10%',
      align: 'left' as const,
      isSortable: true,
      render: (value: string) => (
        <StatusChipAtom status={value.toUpperCase()} />
      ),
    },
    {
      key: 'id' as keyof ContractItem,
      label: t('contract:action'),
      width: '8%',
      align: 'center' as const,
      isSortable: false,
      render: () => (
        <StyledActionContainer>
          <StyledActionIconButton
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
          >
            <IconAtom name="download" size={20} />
          </StyledActionIconButton>
        </StyledActionContainer>
      ),
    },
  ];

  // Update first column to have header checkbox
  const columnsWithHeaderCheckbox = [
    {
      ...columns[0],
      renderHeader: () => (
        <CheckBoxAtom
          checked={isAllSelected}
          indeterminate={isIndeterminate}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      ),
    },
    ...columns.slice(1),
  ];

  return (
    <Box>
      <PageHeaderOrganism title={t('common:contracts')} />
      <StyledContentContainer>
        <StyledFiltersContainer>
          <StyledActionDropdown
            value={actionValue}
            onChange={(e) => handleActionChange(e.target.value as string)}
            placeholder={t('common:action')}
            size="small"
            fullWidth={false}
            disabled={selectedRows.length === 0}
            options={[
              { value: 'activate', label: t('contract:activate') },
              { value: 'terminate', label: t('contract:terminate') },
              { value: 'delete', label: t('contract:delete') },
            ]}
          />
          <StyledSearchInput
            placeholder={t('common:searchKeyword')}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            endIcon={<IconAtom name="search" size={20} />}
            fullWidth={false}
          />
        </StyledFiltersContainer>
        <TableOrganism<ContractItem>
          columns={columnsWithHeaderCheckbox}
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
      </StyledContentContainer>
      <ContractTerminationModalOrganism
        open={isTerminationModalOpen}
        onClose={() => {
          setIsTerminationModalOpen(false);
          setActionValue('');
        }}
        onSubmit={handleTerminationSubmit}
        selectedContracts={selectedContracts}
      />
      <ModalDialog
        open={isDeleteConfirmOpen}
        onClose={() => {
          setIsDeleteConfirmOpen(false);
          setActionValue('');
        }}
        title={t('contract:confirmDelete')}
        footer={
          <>
            <ButtonAtom
              variant="primary"
              color="error"
              onClick={handleDeleteConfirm}
            >
              {t('contract:delete')}
            </ButtonAtom>
            <ButtonAtom
              variant="secondary"
              color="inherit"
              onClick={() => {
                setIsDeleteConfirmOpen(false);
                setActionValue('');
              }}
            >
              {t('common:cancel')}
            </ButtonAtom>
          </>
        }
        showFooter
        fullWidth
        maxWidth="sm"
      >
        <Typography variant="body1">
          {t('contract:confirmDeleteMessage', { count: selectedRows.length })}
        </Typography>
      </ModalDialog>
    </Box>
  );
};

export default Contracts;
