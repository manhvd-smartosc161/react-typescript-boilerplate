import React, { useMemo, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { PageHeaderOrganism, TableOrganism } from '@src/components/organisms';
import { InputAtom, IconAtom } from '@src/components/atoms';
import { ESortDirection } from '@src/constants';
import { EmailSettingItem } from '@src/types/email';
import { EditEmailModalOrganism } from '@src/components/organisms';
import {
  useGetEmailTemplates,
  useGetEmailTemplateById,
  useUpdateEmailTemplateMutation,
} from '@src/hooks';
import { useDebounce } from '@src/hooks/common';
import { formatDate } from '@src/utils/date';
import { EmailTemplate } from '@src/types/email';

const EmailSettings: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<'asc' | 'desc'>(ESortDirection.DESC);
  const [orderBy, setOrderBy] = useState<keyof EmailSettingItem>('createdDate');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  const searchParams = useMemo(() => {
    return {
      page: currentPage,
      limit: rowsPerPage,
      ...(debouncedSearchKeyword && { searchTerms: debouncedSearchKeyword }),
    };
  }, [currentPage, rowsPerPage, debouncedSearchKeyword]);

  const { data, isLoading, isError } = useGetEmailTemplates(searchParams);
  const updateEmailMutation = useUpdateEmailTemplateMutation();
  const { data: emailDetail, isLoading: isLoadingDetail } =
    useGetEmailTemplateById(selectedEmailId || undefined);

  // Transform API data to component format
  const transformedData = useMemo(() => {
    if (!data?.items) return [];

    return data.items.map((item: EmailTemplate): EmailSettingItem => {
      // Format dates
      const createdDate = formatDate(item.createdAt, 'YYYY-MM-DD HH:mm');
      const updatedDate =
        item.updatedAt && item.updatedAt !== '0001-01-01T00:00:00Z'
          ? formatDate(item.updatedAt, 'YYYY-MM-DD HH:mm')
          : '';

      return {
        id: item.id,
        subject: item.subject,
        remarks: item.remarks || '',
        createdDate,
        updatedDate,
        emailEn: item.emailEn || '',
        emailTh: item.emailTh || '',
      };
    });
  }, [data]);

  const total = data?.pagination?.total || 0;
  const pagesCount = data?.pagination?.pagesCount || 0;

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof EmailSettingItem,
  ) => {
    const isAsc = orderBy === property && order === ESortDirection.ASC;
    setOrder(isAsc ? ESortDirection.DESC : ESortDirection.ASC);
    setOrderBy(property);
  };

  const handleEdit = (id: string | number) => {
    setSelectedEmailId(String(id));
    setOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setSelectedEmailId(null);
  };

  // Transform email detail to component format
  const selectedEmail = useMemo(() => {
    if (!emailDetail) return null;

    const createdDate = formatDate(emailDetail.createdAt, 'YYYY-MM-DD HH:mm');
    const updatedDate =
      emailDetail.updatedAt && emailDetail.updatedAt !== '0001-01-01T00:00:00Z'
        ? formatDate(emailDetail.updatedAt, 'YYYY-MM-DD HH:mm')
        : '';

    return {
      id: emailDetail.id,
      subject: emailDetail.subject,
      remarks: emailDetail.remarks || '',
      createdDate,
      updatedDate,
      emailEn: emailDetail.emailEn || '',
      emailTh: emailDetail.emailTh || '',
    };
  }, [emailDetail]);

  const handleUpdateEmail = (updateData: {
    subject: string;
    emailEn: string;
    emailTh: string;
    remark: string;
  }) => {
    if (!selectedEmail) return;

    updateEmailMutation.mutate(
      {
        id: String(selectedEmail.id),
        data: updateData,
      },
      {
        onSuccess: () => {
          handleCloseModal();
        },
      },
    );
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
        <Box>Error loading email templates. Please try again.</Box>
      </Box>
    );
  };

  const renderTable = () => {
    return (
      <TableOrganism<EmailSettingItem>
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
        {renderContent()}
      </Box>
      <EditEmailModalOrganism
        open={openEditModal && !!selectedEmail && !isLoadingDetail}
        onClose={handleCloseModal}
        onSubmit={handleUpdateEmail}
        initialData={selectedEmail}
      />
    </Box>
  );
};

export default EmailSettings;
