import { FC, useMemo } from 'react';
import { Box, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DashboardTemplate } from '@src/templates';
import { StatsGrid, DataTable, ChartCard } from '@src/organisms';
import { Title, Button } from '@src/atoms';
import { GridColDef } from '@mui/x-data-grid';

const Home: FC = () => {
  // Memoize static data to prevent unnecessary re-renders
  const stats = useMemo(
    () => [
      {
        title: 'Total Employees',
        value: 156,
        icon: <PersonIcon />,
        color: 'primary' as const,
      },
      {
        title: 'New Employees',
        value: 12,
        icon: <GroupIcon />,
        color: 'success' as const,
      },
      {
        title: 'Leave Days',
        value: 8,
        icon: <EventIcon />,
        color: 'warning' as const,
      },
      {
        title: 'Total Salary',
        value: '125M',
        icon: <AttachMoneyIcon />,
        color: 'danger' as const,
        suffix: ' USD',
      },
    ],
    [],
  );

  // Memoize mock data for recent employees
  const recentEmployees = useMemo(
    () => [
      {
        id: 1,
        name: 'John Smith',
        position: 'Developer',
        department: 'IT',
        email: 'john.smith@company.com',
        phone: '0123456789',
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        position: 'Designer',
        department: 'Design',
        email: 'sarah.johnson@company.com',
        phone: '0123456790',
      },
      {
        id: 3,
        name: 'Mike Wilson',
        position: 'Manager',
        department: 'HR',
        email: 'mike.wilson@company.com',
        phone: '0123456791',
      },
      {
        id: 4,
        name: 'Emily Davis',
        position: 'Marketing Specialist',
        department: 'Marketing',
        email: 'emily.davis@company.com',
        phone: '0123456792',
      },
      {
        id: 5,
        name: 'David Brown',
        position: 'Sales Executive',
        department: 'Sales',
        email: 'david.brown@company.com',
        phone: '0123456793',
      },
      {
        id: 6,
        name: 'Lisa Anderson',
        position: 'QA Engineer',
        department: 'IT',
        email: 'lisa.anderson@company.com',
        phone: '0123456794',
      },
      {
        id: 7,
        name: 'Robert Taylor',
        position: 'Financial Analyst',
        department: 'Finance',
        email: 'robert.taylor@company.com',
        phone: '0123456795',
      },
      {
        id: 8,
        name: 'Jennifer Lee',
        position: 'UX Designer',
        department: 'Design',
        email: 'jennifer.lee@company.com',
        phone: '0123456796',
      },
      {
        id: 9,
        name: 'Michael Chen',
        position: 'DevOps Engineer',
        department: 'IT',
        email: 'michael.chen@company.com',
        phone: '0123456797',
      },
      {
        id: 10,
        name: 'Amanda White',
        position: 'HR Coordinator',
        department: 'HR',
        email: 'amanda.white@company.com',
        phone: '0123456798',
      },
      {
        id: 11,
        name: 'James Rodriguez',
        position: 'Product Manager',
        department: 'Product',
        email: 'james.rodriguez@company.com',
        phone: '0123456799',
      },
      {
        id: 12,
        name: 'Maria Garcia',
        position: 'Content Writer',
        department: 'Marketing',
        email: 'maria.garcia@company.com',
        phone: '0123456800',
      },
    ],
    [],
  );

  // Memoize Highcharts options
  const chartOptions = useMemo(
    () => ({
      chart: {
        type: 'column',
        height: 320,
      },
      title: {
        text: 'Employee Count by Department',
        style: { fontSize: '18px' },
      },
      xAxis: {
        categories: ['IT', 'Design', 'HR', 'Marketing', 'Sales'],
        title: { text: 'Department' },
      },
      yAxis: {
        min: 0,
        title: { text: 'Number of Employees' },
        allowDecimals: false,
      },
      series: [
        {
          name: 'Employees',
          type: 'column',
          data: [60, 30, 20, 25, 21],
          colorByPoint: true,
        },
      ],
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        column: {
          borderRadius: 4,
        },
      },
    }),
    [],
  );

  // Memoize table columns for MUI DataGrid
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
            <Button variant="primary" size="small" icon={<EditIcon />}>
              Edit
            </Button>
            <Button variant="danger" size="small" icon={<DeleteIcon />}>
              Delete
            </Button>
          </Stack>
        ),
      },
    ],
    [],
  );

  return (
    <DashboardTemplate>
      <Title level={2}>Dashboard</Title>

      {/* Statistics Cards */}
      <StatsGrid stats={stats} />

      {/* Employee Chart */}
      <Box sx={{ marginTop: 3 }}>
        <ChartCard>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </ChartCard>
      </Box>

      {/* Recent Employees Table */}
      <Box sx={{ marginTop: 3 }}>
        <DataTable
          columns={columns}
          dataSource={recentEmployees}
          pagination={true}
          cardTitle="Recent Employees"
          cardExtra={
            <Button variant="primary" icon={<AddIcon />}>
              Add Employee
            </Button>
          }
        />
      </Box>
    </DashboardTemplate>
  );
};

export default Home;
