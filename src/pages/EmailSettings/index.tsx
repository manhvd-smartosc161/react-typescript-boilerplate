import React, { useState } from 'react';
import { Box } from '@mui/material';
import { PageHeaderOrganism, TableOrganism } from '@src/components/organisms';
import { InputAtom, IconAtom } from '@src/components/atoms';
import { ESortDirection } from '@src/constants';
import {
  emailSettingsData,
  EmailSettingItem,
} from '@src/mock/emailSettingsData';
import { EditEmailModalOrganism } from '@src/components/organisms';

const EmailSettings: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<'asc' | 'desc'>(ESortDirection.ASC);
  const [orderBy, setOrderBy] = useState<keyof EmailSettingItem>('id');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<EmailSettingItem | null>(
    null,
  );

  // TODO: Filter will be handled by API call
  const filteredData = emailSettingsData;

  const total = filteredData.length;
  const pagesCount = Math.ceil(total / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof EmailSettingItem,
  ) => {
    const isAsc = orderBy === property && order === ESortDirection.ASC;
    setOrder(isAsc ? ESortDirection.DESC : ESortDirection.ASC);
    setOrderBy(property);
  };

  const handleEdit = (id: number) => {
    const emailItem = emailSettingsData.find((item) => item.id === id);
    if (emailItem) {
      setSelectedEmail(emailItem);
      setOpenEditModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setSelectedEmail(null);
  };

  const handleUpdateEmail = (data: {
    subject: string;
    emailEn: string;
    emailTh: string;
    remark: string;
  }) => {
    console.log('Update email:', data);
    // TODO: Call API to update email
  };

  const columns = [
    {
      key: 'id' as keyof EmailSettingItem,
      label: 'ID',
      width: '5%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'subject' as keyof EmailSettingItem,
      label: 'Subject',
      width: '25%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'remarks' as keyof EmailSettingItem,
      label: 'Remarks',
      width: '20%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'createdDate' as keyof EmailSettingItem,
      label: 'Created Date',
      width: '20%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'updatedDate' as keyof EmailSettingItem,
      label: 'Updated Date',
      width: '20%',
      align: 'left' as const,
      isSortable: true,
    },
    {
      key: 'id' as keyof EmailSettingItem,
      label: 'Edit',
      width: '10%',
      align: 'center' as const,
      isSortable: false,
      render: (_value: any, record: EmailSettingItem) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(record.id);
          }}
        >
          <IconAtom name="edit" size={20} />
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <PageHeaderOrganism title="Emails" />
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
        <TableOrganism<EmailSettingItem>
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
      <EditEmailModalOrganism
        open={openEditModal}
        onClose={handleCloseModal}
        onSubmit={handleUpdateEmail}
        initialData={selectedEmail}
      />
    </Box>
  );
};

export default EmailSettings;
