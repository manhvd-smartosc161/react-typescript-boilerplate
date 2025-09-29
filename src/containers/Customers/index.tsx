import { FC, useState } from 'react';
import {
  SearchOutlined,
  DownOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { Pagination } from 'antd';
import {
  PageContainer,
  WrapSearchComp,
  SectionTitle,
  SectionSubtitle,
  SearchContainer,
  SearchInput,
  StatusSelect,
  SearchButton,
  WrapTableBox,
  TableHeader,
  TableTitle,
  TableSubtitle,
  CustomTable,
  StatusBadge,
  CustomerInfo,
  CustomerAvatar,
  CustomerDetails,
  CustomerName,
  CustomerEmail,
  LoginInfo,
  LoginDate,
  LoginTime,
  PaginationWrapper,
} from './index.styled';
import Title from 'antd/es/skeleton/Title';
import TitleDateTopSite from '@src/components/TitleDateTopSite';

interface Customer {
  id: string;
  name: string;
  email: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  status: 'Active' | 'Inactive' | 'Pending' | 'Suspended';
  lastLoginDate: string;
  lastLoginTime: string;
  avatar: string;
}

const CustomersContainer: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Mock data - 80 customers for 10 pages
  const mockCustomers: Customer[] = Array.from({ length: 80 }, (_, index) => {
    const names = [
      'John Doe',
      'Jane Smith',
      'Michael Johnson',
      'Emily Davis',
      'David Wilson',
      'Sarah Brown',
      'Chris Taylor',
      'Amanda Miller',
      'James Anderson',
      'Lisa Garcia',
      'Robert Martinez',
      'Jennifer Rodriguez',
      'William Lopez',
      'Michelle Hernandez',
      'Thomas Moore',
      'Jessica Jackson',
      'Charles Martin',
      'Ashley Lee',
      'Daniel Perez',
      'Stephanie Thompson',
      'Matthew White',
      'Nicole Harris',
      'Anthony Clark',
      'Rebecca Lewis',
      'Mark Robinson',
      'Laura Walker',
      'Paul Hall',
      'Karen Allen',
      'Steven Young',
      'Donna King',
      'Kenneth Wright',
      'Carol Scott',
      'Joshua Green',
      'Sharon Adams',
      'Kevin Baker',
      'Nancy Nelson',
      'Brian Carter',
      'Betty Mitchell',
      'George Perez',
      'Helen Roberts',
      'Edward Turner',
      'Sandra Phillips',
      'Ronald Campbell',
      'Deborah Parker',
      'Jason Evans',
      'Mary Collins',
      'Ryan Stewart',
      'Linda Sanchez',
      'Kevin Morris',
      'Patricia Rogers',
      'Eric Reed',
      'Susan Cook',
      'Gregory Bailey',
      'Kimberly Rivera',
      'Timothy Cooper',
      'Angela Richardson',
      'Jeffrey Cox',
      'Brenda Howard',
      'Jacob Ward',
      'Amy Torres',
      'Nicholas Peterson',
      'Julie Gray',
      'Jonathan Ramirez',
      'Heather James',
      'Samuel Watson',
      'Christina Brooks',
      'Aaron Kelly',
      'Frances Sanders',
      'Jose Price',
      'Martha Bennett',
      'Adam Wood',
      'Denise Barnes',
      'Nathan Ross',
      'Gloria Henderson',
      'Zachary Coleman',
      'Diana Jenkins',
      'Peter Perry',
      'Cheryl Powell',
      'Kyle Long',
    ];

    const domains = [
      'gmail.com',
      'yahoo.com',
      'outlook.com',
      'company.com',
      'business.com',
    ];
    const statuses: Customer['status'][] = [
      'Active',
      'Inactive',
      'Pending',
      'Suspended',
    ];
    const accountTypes = ['Checking', 'Savings', 'Business', 'Premium'];

    const name = names[index % names.length];
    const firstName = name.split(' ')[0].toLowerCase();
    const lastName = name.split(' ')[1].toLowerCase();

    return {
      id: `CUST${(index + 1).toString().padStart(4, '0')}`,
      name,
      email: `${firstName}.${lastName}@${domains[index % domains.length]}`,
      accountNumber: `ACC${(10000000 + index).toString()}`,
      accountType: accountTypes[index % accountTypes.length],
      balance: Math.floor(Math.random() * 100000) + 1000,
      status: statuses[index % statuses.length],
      lastLoginDate: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
      ).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      lastLoginTime: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(
        Math.random() * 60,
      )
        .toString()
        .padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      avatar: name
        .split(' ')
        .map((n) => n[0])
        .join(''),
    };
  });

  const pageSize = 8;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = mockCustomers.slice(startIndex, endIndex);
  const totalShowing = Math.min(endIndex, mockCustomers.length);

  const columns = [
    {
      title: '#',
      key: 'index',
      render: (_: any, __: any, index: number) => startIndex + index + 1,
      width: 60,
    },
    {
      title: 'Customer',
      key: 'customer',
      render: (customer: Customer) => (
        <CustomerInfo>
          <CustomerAvatar>{customer.avatar}</CustomerAvatar>
          <CustomerDetails>
            <CustomerName>{customer.name}</CustomerName>
            <CustomerEmail>{customer.email}</CustomerEmail>
          </CustomerDetails>
        </CustomerInfo>
      ),
      width: 250,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Account',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
      width: 120,
    },
    {
      title: 'Type',
      dataIndex: 'accountType',
      key: 'accountType',
      width: 100,
    },
    {
      title: 'Balance',
      key: 'balance',
      render: (customer: Customer) => `$${customer.balance.toLocaleString()}`,
      width: 120,
    },
    {
      title: 'Status',
      key: 'status',
      render: (customer: Customer) => (
        <StatusBadge status={customer.status}>{customer.status}</StatusBadge>
      ),
      width: 100,
    },
    {
      title: 'Last Login',
      key: 'lastLogin',
      render: (customer: Customer) => (
        <LoginInfo>
          <LoginDate>{customer.lastLoginDate}</LoginDate>
          <LoginTime>{customer.lastLoginTime}</LoginTime>
        </LoginInfo>
      ),
      width: 140,
    },
  ];

  const statusOptions = [
    { value: 'All Status', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Suspended', label: 'Suspended' },
  ];

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchTerm, 'Status:', statusFilter);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <PageContainer>
        <TitleDateTopSite
          title="Customer Management"
          subtitle="Search and manage customer accounts"
        />

        <WrapSearchComp>
          <SectionTitle>
            <FilterOutlined style={{ fontSize: '20px', color: '#2f529f' }} />
            <h3>Search & Filter Customers</h3>
          </SectionTitle>

          <SectionSubtitle>
            Find customers by name, email, account number, or customer ID
          </SectionSubtitle>

          <SearchContainer>
            <SearchInput
              placeholder="Search by name, account number, or email..."
              prefix={<SearchOutlined style={{ color: '#6F6F6F' }} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <StatusSelect
              defaultValue="All Status"
              options={statusOptions}
              suffixIcon={<DownOutlined />}
              value={statusFilter}
              onChange={(value) => setStatusFilter(value as string)}
            />

            <SearchButton
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
            >
              Search
            </SearchButton>
          </SearchContainer>
        </WrapSearchComp>

        <WrapTableBox>
          <TableHeader>
            <TableTitle>Customer List</TableTitle>
            <TableSubtitle>
              Showing {totalShowing} of {mockCustomers.length} customers
            </TableSubtitle>
          </TableHeader>

          <CustomTable
            columns={columns}
            dataSource={currentData}
            pagination={false}
            rowKey="id"
          />

          <PaginationWrapper>
            <Pagination
              current={currentPage}
              total={mockCustomers.length}
              pageSize={pageSize}
              showSizeChanger={false}
              onChange={handlePageChange}
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
            />
          </PaginationWrapper>
        </WrapTableBox>
      </PageContainer>
    </div>
  );
};

export default CustomersContainer;
