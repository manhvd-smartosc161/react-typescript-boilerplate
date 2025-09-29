import { FC, useMemo, Suspense } from 'react';
import { Row, Col, Statistic, Button, Space, Table, Spin } from 'antd';
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
import { PageTitle } from '@src/components';
import { StyledCard } from './index.styled';

const Home: FC = () => {
  // Memoize static data to prevent unnecessary re-renders
  const stats = useMemo(
    () => [
      {
        title: 'Total Employees',
        value: 156,
        icon: <UserOutlined />,
        color: '#1890ff',
      },
      {
        title: 'New Employees',
        value: 12,
        icon: <TeamOutlined />,
        color: '#52c41a',
      },
      {
        title: 'Leave Days',
        value: 8,
        icon: <CalendarOutlined />,
        color: '#faad14',
      },
      {
        title: 'Total Salary',
        value: 125000000,
        icon: <DollarOutlined />,
        color: '#f5222d',
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
            <Button type="primary" size="small" icon={<EditOutlined />}>
              Edit
            </Button>
            <Button danger size="small" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Space>
        ),
      },
    ],
    [],
  );

  return (
    <div>
      <PageTitle>Dashboard</PageTitle>
      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <StyledCard>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
                suffix={stat.suffix}
              />
            </StyledCard>
          </Col>
        ))}
      </Row>

      {/* Highcharts Card with Lazy Loading */}
      <StyledCard style={{ marginTop: 24 }}>
        <Suspense
          fallback={
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <Spin size="large" />
            </div>
          }
        >
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Suspense>
      </StyledCard>

      {/* Recent Employees Table */}
      <StyledCard
        title="Recent Employees"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            Add Employee
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={recentEmployees}
          pagination={false}
          size="small"
        />
      </StyledCard>
    </div>
  );
};

export default Home;
