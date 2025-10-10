import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@src/components/organisms';
import { TableOrganism } from '@src/components/organisms';
import { StatusChipAtom, ActionButtonAtom } from '@src/components/atoms';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { leadsData } from '@src/mock/leadsData';
import { LeadData } from '@src/types';
import { StyledContainer, StyledPaper } from './index.styled';

const LeadsPage: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(4);
  const [leads, setLeads] = useState(leadsData);

  const handleAssign = (id: number) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === id
          ? { ...lead, assigned: true, status: 'In-progress' }
          : lead,
      ),
    );
  };

  const handleViewDetails = (id: number) => {
    console.log('View details for lead:', id);
    // TODO: Implement navigation to details page
  };

  const handleDetailReport = () => {
    console.log('Generate detail report');
    // TODO: Implement detail report generation
    alert('Detail Report feature coming soon!');
  };

  const columns = [
    {
      key: 'company' as keyof LeadData,
      label: t('lead:company'),
    },
    {
      key: 'customerName' as keyof LeadData,
      label: t('lead:customerName'),
      render: (value: string) => (
        <span style={{ fontWeight: 'bold' }}>{value}</span>
      ),
    },
    {
      key: 'annualRevenue' as keyof LeadData,
      label: t('lead:annualRevenue'),
      render: (value: number) => `$${value}`,
    },
    {
      key: 'date' as keyof LeadData,
      label: t('lead:date'),
    },
    {
      key: 'status' as keyof LeadData,
      label: t('lead:status'),
      render: (value: string) => <StatusChipAtom status={value} size="small" />,
    },
    {
      key: 'remarks' as keyof LeadData,
      label: t('lead:remarks'),
      render: (value: string) => value || '-',
    },
    {
      key: 'assigned' as keyof LeadData,
      label: t('lead:assign'),
      width: '120px',
      align: 'center' as const,
      render: (value: boolean, record: LeadData) => {
        return record.assigned ? (
          <ActionButtonAtom variant="assigned" startIcon={<CheckCircleIcon />}>
            {t('lead:assigned')}
          </ActionButtonAtom>
        ) : (
          <ActionButtonAtom
            variant="assign"
            onClick={() => handleAssign(record.id)}
          >
            {t('lead:assign')}
          </ActionButtonAtom>
        );
      },
    },
    {
      key: 'id' as keyof LeadData,
      label: t('common:view'),
      width: '120px',
      align: 'center' as const,
      render: (value: number, record: LeadData) => (
        <ActionButtonAtom
          variant="details"
          startIcon={<VisibilityIcon />}
          onClick={() => handleViewDetails(record.id)}
        >
          {t('common:details')}
        </ActionButtonAtom>
      ),
    },
  ];

  return (
    <StyledContainer>
      <StyledPaper>
        <PageHeader
          title={t('supplier:supplierRegistrationLeads')}
          leading={<AssignmentIcon sx={{ color: '#1976d2', fontSize: 28 }} />}
          trailing={
            <ActionButtonAtom
              variant="detail-report"
              startIcon={<DescriptionIcon />}
              onClick={handleDetailReport}
            >
              {t('supplier:detailReport')}
            </ActionButtonAtom>
          }
        />

        <Box sx={{ mt: 3 }}>
          <TableOrganism<LeadData>
            columns={columns}
            data={leads}
            rowKey="id"
            pagination={{
              current: currentPage,
              total: 100,
              pageSize: 10,
              onChange: (page) => setCurrentPage(page),
            }}
          />
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default LeadsPage;
