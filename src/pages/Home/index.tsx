import { FC, useMemo } from 'react';
import { Stack, Box, Typography, CircularProgress, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { GridColDef } from '@mui/x-data-grid';
import { DashboardTemplate } from '@src/components/templates';
import {
  StatsGridOrganism,
  DataTableOrganism,
  ChartCardOrganism,
} from '@src/components/organisms';
import { ButtonAtom, CardAtom } from '@src/components/atoms';
import {
  mockStats,
  mockEmployees,
  mockChartOptions,
} from '@src/mock/dashboardData';
import { useCurrentUser } from '@src/hooks';
import { StyledChartSection, StyledTableSection } from './index.styled';

const Home: FC = () => {
  const { data: currentUser, isLoading, error, refetch } = useCurrentUser();

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

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'position',
        headerName: 'Position',
        flex: 1,
        minWidth: 120,
      },
      {
        field: 'department',
        headerName: 'Department',
        flex: 1,
        minWidth: 120,
      },
      {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        minWidth: 200,
      },
      {
        field: 'phone',
        headerName: 'Phone',
        flex: 1,
        minWidth: 130,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 180,
        sortable: false,
        renderCell: () => (
          <Stack direction="row" spacing={1} py={1}>
            <ButtonAtom variant="primary" size="small" icon={<EditIcon />}>
              Edit
            </ButtonAtom>
            <ButtonAtom variant="danger" size="small" icon={<DeleteIcon />}>
              Delete
            </ButtonAtom>
          </Stack>
        ),
      },
    ],
    [],
  );

  return (
    <DashboardTemplate>
      <CardAtom sx={{ mb: 3, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          User Information
        </Typography>
        {isLoading && (
          <Box display="flex" alignItems="center" gap={2}>
            <CircularProgress size={20} />
            <Typography>Loading user data...</Typography>
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error: {String(error)}
          </Alert>
        )}
        {currentUser && (
          <Box>
            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2" color="primary">
                User Information:
              </Typography>
              <Typography variant="body2">
                <strong>Name:</strong> {currentUser.name}
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong> {currentUser.email}
              </Typography>
            </Box>
            <ButtonAtom
              variant="secondary"
              size="small"
              onClick={() => refetch()}
              sx={{ mt: 2 }}
            >
              🔄 Refetch Data
            </ButtonAtom>
          </Box>
        )}
      </CardAtom>

      <StatsGridOrganism stats={stats} />

      <StyledChartSection>
        <ChartCardOrganism>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </ChartCardOrganism>
      </StyledChartSection>

      <StyledTableSection>
        <DataTableOrganism
          columns={columns}
          dataSource={recentEmployees}
          pagination={true}
          cardTitle="Recent Employees"
          cardExtra={
            <ButtonAtom variant="primary" icon={<AddIcon />}>
              Add Employee
            </ButtonAtom>
          }
        />
      </StyledTableSection>
    </DashboardTemplate>
  );
};

export default Home;
