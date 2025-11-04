import React, { useState } from 'react';
import { Box } from '@mui/material';
import { PageHeaderOrganism, TableOrganism } from '@src/components/organisms';
import { IconAtom, CheckBoxAtom } from '@src/components/atoms';
import { ESortDirection } from '@src/constants';
import { contractsData, ContractItem } from '@src/mock/contractsData';
import {
  StyledContentContainer,
  StyledFiltersContainer,
  StyledContractIdLink,
  StyledCompanyNameText,
  StyledStatusBadge,
  StyledActionContainer,
  StyledActionIconButton,
  StyledActionDropdown,
  StyledSearchInput,
} from './index.styled';

const Contracts: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<'asc' | 'desc'>(ESortDirection.ASC);
  const [orderBy, setOrderBy] = useState<keyof ContractItem>('id');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [actionValue, setActionValue] = useState('');

  // TODO: Filter will be handled by API call
  const filteredData = contractsData;

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

  const handleActionChange = (value: string) => {
    if (!value) return;

    setActionValue(value);

    if (selectedRows.length > 0) {
      console.log(`Bulk action: ${value} on rows:`, selectedRows);
      // TODO: Implement bulk actions
      // Reset after action is processed
      setActionValue('');
    }
  };

  const handleEdit = (id: number) => {
    console.log('Edit contract:', id);
    // TODO: Implement edit functionality
  };

  const handleDownload = (id: number) => {
    console.log('Download contract:', id);
    // TODO: Implement download functionality
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
      label: 'ID',
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
      label: 'Supplier Name',
      width: '18%',
      align: 'left' as const,
      isSortable: true,
      render: (_value: any, record: ContractItem) => (
        <StyledCompanyNameText>{record.companyName}</StyledCompanyNameText>
      ),
    },
    {
      key: 'email' as keyof ContractItem,
      label: 'Email',
      width: '15%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'startDate' as keyof ContractItem,
      label: 'Start date',
      width: '12%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'endDate' as keyof ContractItem,
      label: 'End date',
      width: '12%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'leadOwner' as keyof ContractItem,
      label: 'Lead Owner',
      width: '15%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'status' as keyof ContractItem,
      label: 'Status',
      width: '10%',
      align: 'left' as const,
      isSortable: true,
      render: (_value: any, record: ContractItem) => (
        <StyledStatusBadge $isActive={record.status === 'Active'}>
          {record.status}
        </StyledStatusBadge>
      ),
    },
    {
      key: 'id' as keyof ContractItem,
      label: 'Action',
      width: '8%',
      align: 'center' as const,
      isSortable: false,
      render: (_value: any, record: ContractItem) => (
        <StyledActionContainer>
          <StyledActionIconButton
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(record.id);
            }}
          >
            <IconAtom name="edit" size={20} />
          </StyledActionIconButton>
          <StyledActionIconButton
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(record.id);
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
      <PageHeaderOrganism title="Contracts" />
      <StyledContentContainer>
        <StyledFiltersContainer>
          <StyledActionDropdown
            value={actionValue}
            onChange={(e) => handleActionChange(e.target.value as string)}
            placeholder="Action"
            size="small"
            fullWidth={false}
            options={[
              { value: 'activate', label: 'Activate' },
              { value: 'terminate', label: 'Terminate' },
              { value: 'delete', label: 'Delete' },
            ]}
          />
          <StyledSearchInput
            placeholder="Search keyword"
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
    </Box>
  );
};

export default Contracts;
