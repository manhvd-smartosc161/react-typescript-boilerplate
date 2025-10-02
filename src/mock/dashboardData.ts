import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export { mockUser, mockUsers } from './authData';

export const mockStats = [
  {
    title: 'Total Employees',
    value: 156,
    icon: PersonIcon,
    color: 'primary' as const,
  },
  {
    title: 'New Employees',
    value: 12,
    icon: GroupIcon,
    color: 'success' as const,
  },
  {
    title: 'Leave Days',
    value: 8,
    icon: EventIcon,
    color: 'warning' as const,
  },
  {
    title: 'Total Salary',
    value: '125M',
    icon: AttachMoneyIcon,
    color: 'danger' as const,
    suffix: ' USD',
  },
];

export const mockEmployees = [
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
];

export const mockChartOptions = {
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
};
