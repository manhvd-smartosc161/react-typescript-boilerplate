export interface ContractItem {
  id: number;
  contractId: string;
  companyName: string;
  email: string;
  startDate: string;
  endDate: string;
  leadOwner: string;
  status: 'Active' | 'Inactive';
}

export const contractsData: ContractItem[] = [
  {
    id: 1,
    contractId: 'IN/1001/23',
    companyName: 'John Doe Ltd.',
    email: 'finance@johndoe.com',
    startDate: '2022-01-23',
    endDate: '2023-01-23',
    leadOwner: '[Buyer name]',
    status: 'Active',
  },
  {
    id: 2,
    contractId: 'IN/1001/23',
    companyName: 'Company Name',
    email: 'invoice@company.com',
    startDate: '2022-01-23',
    endDate: '2023-01-23',
    leadOwner: '[Buyer name]',
    status: 'Inactive',
  },
  {
    id: 3,
    contractId: 'IN/1001/23',
    companyName: 'Company Name',
    email: 'invoice@company.com',
    startDate: '2022-01-23',
    endDate: '2023-01-23',
    leadOwner: '[Buyer name]',
    status: 'Inactive',
  },
  {
    id: 4,
    contractId: 'IN/1002/23',
    companyName: 'ABC Corporation',
    email: 'contact@abc.com',
    startDate: '2022-02-15',
    endDate: '2023-02-15',
    leadOwner: 'Mai Bui',
    status: 'Active',
  },
  {
    id: 5,
    contractId: 'IN/1003/23',
    companyName: 'XYZ Industries',
    email: 'admin@xyz.com',
    startDate: '2022-03-10',
    endDate: '2023-03-10',
    leadOwner: '[Buyer name]',
    status: 'Active',
  },
  {
    id: 6,
    contractId: 'IN/1004/23',
    companyName: 'Tech Solutions Inc.',
    email: 'info@techsol.com',
    startDate: '2022-04-20',
    endDate: '2023-04-20',
    leadOwner: 'Mai Bui',
    status: 'Inactive',
  },
  {
    id: 7,
    contractId: 'IN/1005/23',
    companyName: 'Global Trade Co.',
    email: 'sales@globaltrade.com',
    startDate: '2022-05-05',
    endDate: '2023-05-05',
    leadOwner: '[Buyer name]',
    status: 'Active',
  },
  {
    id: 8,
    contractId: 'IN/1006/23',
    companyName: 'Modern Business Ltd.',
    email: 'contact@modernbiz.com',
    startDate: '2022-06-12',
    endDate: '2023-06-12',
    leadOwner: 'Mai Bui',
    status: 'Active',
  },
  {
    id: 9,
    contractId: 'IN/1007/23',
    companyName: 'Prime Suppliers',
    email: 'info@primesuppliers.com',
    startDate: '2022-07-18',
    endDate: '2023-07-18',
    leadOwner: '[Buyer name]',
    status: 'Inactive',
  },
  {
    id: 10,
    contractId: 'IN/1008/23',
    companyName: 'Elite Trading',
    email: 'contact@elitetrading.com',
    startDate: '2022-08-25',
    endDate: '2023-08-25',
    leadOwner: 'Mai Bui',
    status: 'Active',
  },
  {
    id: 11,
    contractId: 'IN/1009/23',
    companyName: 'Premium Goods Co.',
    email: 'sales@premiumgoods.com',
    startDate: '2022-09-30',
    endDate: '2023-09-30',
    leadOwner: '[Buyer name]',
    status: 'Active',
  },
  {
    id: 12,
    contractId: 'IN/1010/23',
    companyName: 'Best Value Inc.',
    email: 'info@bestvalue.com',
    startDate: '2022-10-15',
    endDate: '2023-10-15',
    leadOwner: 'Mai Bui',
    status: 'Inactive',
  },
];

