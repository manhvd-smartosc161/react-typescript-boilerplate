import { FC, useMemo } from 'react';
import { Space } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  DollarOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DashboardTemplate } from '@src/templates';
import { StatsGrid, DataTable, ChartCard } from '@src/organisms';
import { Title, Button } from '@src/atoms';

const Home: FC = () => {
  // Memoize static data to prevent unnecessary re-renders
  const stats = useMemo(
    () => [
      {
        title: 'Total Employees',
        value: 156,
        icon: <UserOutlined />,
        color: 'primary' as const,
      },
      {
        title: 'New Employees',
        value: 12,
        icon: <TeamOutlined />,
        color: 'success' as const,
      },
      {
        title: 'Leave Days',
        value: 8,
        icon: <CalendarOutlined />,
        color: 'warning' as const,
      },
      {
        title: 'Total Salary',
        value: '125M',
        icon: <DollarOutlined />,
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
        key: '1',
        name: 'John Smith',
        position: 'Developer',
        department: 'IT',
        email: 'john.smith@company.com',
        phone: '0123456789',
      },
      {
        key: '2',
        name: 'Sarah Johnson',
        position: 'Designer',
        department: 'Design',
        email: 'sarah.johnson@company.com',
        phone: '0123456790',
      },
      {
        key: '3',
        name: 'Mike Wilson',
        position: 'Manager',
        department: 'HR',
        email: 'mike.wilson@company.com',
        phone: '0123456791',
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

  // Memoize table columns
  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
      },
      {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Actions',
        key: 'actions',
        render: () => (
          <Space>
            <Button variant="primary" size="small" icon={<EditOutlined />}>
              Edit
            </Button>
            <Button variant="danger" size="small" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Space>
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

      {/* Highcharts Card */}
      <div style={{ marginTop: 24 }}>
        <ChartCard>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </ChartCard>
      </div>

      {/* Recent Employees Table */}
      <div style={{ marginTop: 24 }}>
        <DataTable
          columns={columns}
          dataSource={recentEmployees}
          pagination={false}
          size="small"
          cardTitle="Recent Employees"
          cardExtra={
            <Button variant="primary" icon={<PlusOutlined />}>
              Add Employee
            </Button>
          }
        />
      </div>
    </DashboardTemplate>
  );
};

export default Home;
