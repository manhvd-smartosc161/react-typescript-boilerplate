import React, { useMemo, useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { StatsGrid, ChartCard } from '@src/components';
import { ActionButtonAtom } from '@src/components/atoms';
import { PageHeader, TableOrganism } from '@src/components/organisms';
import {
  mockStats,
  mockEmployees,
  mockChartOptions,
} from '@src/mock/dashboardData';
import {
  StyledContainer,
  StyledPaper,
  StyledChartSection,
  StyledTableSection,
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
        label: 'Name',
        render: (value: string) => (
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
        ),
      },
      {
        key: 'position' as keyof EmployeeData,
        label: 'Position',
      },
      {
        key: 'department' as keyof EmployeeData,
        label: 'Department',
      },
      {
        key: 'email' as keyof EmployeeData,
        label: 'Email',
      },
      {
        key: 'phone' as keyof EmployeeData,
        label: 'Phone',
      },
      {
        key: 'actions' as keyof EmployeeData,
        label: 'Actions',
        render: (value: any, record: EmployeeData) => (
          <Stack direction="row" spacing={1}>
            <ActionButtonAtom
              variant="details"
              startIcon={<EditIcon />}
              onClick={() => handleEdit(record.id)}
            >
              Edit
            </ActionButtonAtom>
            <ActionButtonAtom
              variant="danger"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(record.id)}
            >
              Delete
            </ActionButtonAtom>
          </Stack>
        ),
      },
    ],
    [],
  );

  return (
    <StyledContainer>
      <StyledPaper>
        <PageHeader
          title="Dashboard"
          leading={<DashboardIcon sx={{ color: '#6f42c1', fontSize: 28 }} />}
        />

        <Box sx={{ mt: 3 }}>
          <StatsGrid stats={stats} />

          <StyledChartSection>
            <ChartCard>
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </ChartCard>
          </StyledChartSection>

          <StyledTableSection>
            <TableOrganism<EmployeeData>
              columns={columns}
              data={recentEmployees}
              rowKey="id"
              pagination={{
                current: currentPage,
                total: recentEmployees.length,
                pageSize: 10,
                onChange: (page) => setCurrentPage(page),
              }}
            />
          </StyledTableSection>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Home;
