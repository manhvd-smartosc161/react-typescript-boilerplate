import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CategoryIcon from '@mui/icons-material/Category';

export { mockUser, mockUsers } from './authData';

export const mockStats = [
  {
    title: 'Total Items',
    value: 1248,
    icon: InventoryIcon,
    color: 'primary' as const,
  },
  {
    title: 'Active Items',
    value: 1120,
    icon: CheckCircleIcon,
    color: 'success' as const,
  },
  {
    title: 'Inactive Items',
    value: 128,
    icon: CancelIcon,
    color: 'warning' as const,
  },
  {
    title: 'Categories',
    value: 15,
    icon: CategoryIcon,
    color: 'info' as const,
  },
];

// Latest Items List
export const mockLatestItems = [
  {
    id: '0001',
    name: 'Wireless Headphones Pro',
    category: 'Electronics',
    status: 'Active',
    stock: 245,
    orders: 156,
    addedDate: '2025-01-20',
  },
  {
    id: '0002',
    name: 'Cotton T-Shirt Premium',
    category: 'Clothing',
    status: 'Active',
    stock: 189,
    orders: 234,
    addedDate: '2025-01-19',
  },
  {
    id: '0003',
    name: 'Organic Coffee Beans',
    category: 'Food & Beverage',
    status: 'Active',
    stock: 156,
    orders: 89,
    addedDate: '2025-01-18',
  },
  {
    id: '0004',
    name: 'Garden Tool Set',
    category: 'Home & Garden',
    status: 'Active',
    stock: 142,
    orders: 67,
    addedDate: '2025-01-17',
  },
  {
    id: '0005',
    name: 'Yoga Mat Professional',
    category: 'Sports',
    status: 'Active',
    stock: 128,
    orders: 145,
    addedDate: '2025-01-16',
  },
  {
    id: '0006',
    name: 'Programming Book Collection',
    category: 'Books',
    status: 'Active',
    stock: 198,
    orders: 278,
    addedDate: '2025-01-15',
  },
  {
    id: '0007',
    name: 'Building Blocks Set',
    category: 'Toys',
    status: 'Inactive',
    stock: 190,
    orders: 123,
    addedDate: '2025-01-14',
  },
  {
    id: '0008',
    name: 'Smart Watch Series 5',
    category: 'Electronics',
    status: 'Active',
    stock: 98,
    orders: 312,
    addedDate: '2025-01-13',
  },
];

// Chart: Item by Category (Latest)
export const mockItemByCategoryChartOptions = {
  chart: {
    type: 'column',
    height: 320,
  },
  title: {
    text: 'Item by Category (Latest)',
    style: { fontSize: '18px' },
  },
  xAxis: {
    categories: [
      'Electronics',
      'Clothing',
      'Food & Beverage',
      'Home & Garden',
      'Sports',
      'Books',
      'Toys',
    ],
    title: { text: 'Category' },
  },
  yAxis: {
    min: 0,
    title: { text: 'Number of Items' },
    allowDecimals: false,
  },
  series: [
    {
      name: 'Items',
      type: 'column',
      data: [245, 189, 156, 142, 128, 198, 190],
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

// Chart: Item Status by Category (Active/Inactive)
export const mockItemStatusByCategoryChartOptions = {
  chart: {
    type: 'column',
    height: 320,
  },
  title: {
    text: 'Item Status by Category (Active/Inactive)',
    style: { fontSize: '18px' },
  },
  xAxis: {
    categories: [
      'Electronics',
      'Clothing',
      'Food & Beverage',
      'Home & Garden',
      'Sports',
      'Books',
      'Toys',
    ],
    title: { text: 'Category' },
  },
  yAxis: {
    min: 0,
    title: { text: 'Number of Items' },
    allowDecimals: false,
  },
  series: [
    {
      name: 'Active',
      type: 'column',
      data: [220, 170, 140, 128, 115, 178, 169],
      color: '#4caf50',
    },
    {
      name: 'Inactive',
      type: 'column',
      data: [25, 19, 16, 14, 13, 20, 21],
      color: '#ff9800',
    },
  ],
  legend: {
    enabled: true,
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

// Chart: Item Creation Lead Times
export const mockItemLeadTimesChartOptions = {
  chart: {
    type: 'line',
    height: 320,
  },
  title: {
    text: 'Item Creation Lead Times',
    style: { fontSize: '18px' },
  },
  xAxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    title: { text: 'Month' },
  },
  yAxis: {
    min: 0,
    title: { text: 'Lead Time (Days)' },
    allowDecimals: true,
  },
  series: [
    {
      name: 'Average Lead Time',
      type: 'line',
      data: [5.2, 4.8, 5.5, 4.9, 5.1, 4.7, 5.3, 4.6, 5.0, 4.8, 5.2, 4.9],
      color: '#2196f3',
      marker: {
        enabled: true,
        radius: 4,
      },
    },
  ],
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    line: {
      lineWidth: 3,
    },
  },
};

// Legacy chart options for backward compatibility
export const mockChartOptions = mockItemByCategoryChartOptions;
