import React, { useMemo, useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { StatsGridOrganism, ChartCardOrganism } from '@src/components';
import { ActionButtonAtom } from '@src/components/atoms';
import { PageHeaderOrganism } from '@src/components/organisms';
import {
  mockStats,
  mockEmployees,
  mockChartOptions,
} from '@src/mock/dashboardData';
import {
  StyledContainer,
  StyledPaper,
  StyledChartSection,
} from './index.styled';

interface EmployeeData {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
}

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const stats = useMemo(
    () =>
      mockStats.map((stat) => ({
        ...stat,
        icon: <stat.icon />,
      })),
    [],
  );

  const recentEmployees = useMemo(() => mockEmployees, []);

  const chartOptions = useMemo(() => mockChartOptions, []);

  const handleEdit = (id: number) => {
    console.log('Edit employee:', id);
    // TODO: Implement edit functionality
  };

  const handleDelete = (id: number) => {
    console.log('Delete employee:', id);
    // TODO: Implement delete functionality
  };

  const columns = useMemo(
    () => [
      {
        key: 'name' as keyof EmployeeData,
        label: t('user:name'),
        render: (value: string) => (
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
        ),
      },
      {
        key: 'position' as keyof EmployeeData,
        label: t('user:position'),
      },
      {
        key: 'department' as keyof EmployeeData,
        label: t('user:department'),
      },
      {
        key: 'email' as keyof EmployeeData,
        label: t('auth:email'),
      },
      {
        key: 'phone' as keyof EmployeeData,
        label: t('user:phone'),
      },
      {
        key: 'actions' as keyof EmployeeData,
        label: t('common:actions'),
        width: '200px',
        align: 'center' as const,
        render: (value: any, record: EmployeeData) => (
          <Stack direction="row" spacing={1}>
            <ActionButtonAtom
              variant="details"
              startIcon={<EditIcon />}
              onClick={() => handleEdit(record.id)}
            >
              {t('common:edit')}
            </ActionButtonAtom>
            <ActionButtonAtom
              variant="danger"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(record.id)}
            >
              {t('common:delete')}
            </ActionButtonAtom>
          </Stack>
        ),
      },
    ],
    [t],
  );

  return (
    <StyledContainer>
      <StyledPaper>
        <PageHeaderOrganism
          title={t('common:dashboard')}
          leading={<DashboardIcon sx={{ color: '#1976d2', fontSize: 28 }} />}
        />

        <Box sx={{ mt: 3 }}>
          <StatsGridOrganism stats={stats} />

          <StyledChartSection>
            <ChartCardOrganism>
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </ChartCardOrganism>
          </StyledChartSection>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Home;
