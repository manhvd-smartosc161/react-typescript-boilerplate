import { FC } from 'react';
import {
  BankOutlined,
  CreditCardOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import {
  AccountsList,
  AccountCard,
  AccountTypeHeader,
  AccountTypeTitle,
  AccountDetails,
  AccountDetailItem,
  AccountDetailTitle,
  AccountDetailValue,
  StatusBadge,
} from '../index.styled';

const AccountTab: FC = () => {
  const accounts = [
    {
      type: 'Checking Account',
      icon: <BankOutlined />,
      accountNumber: '****6789',
      balance: 2500.0,
      isPositive: true,
      status: 'Active',
    },
    {
      type: 'Savings Account',
      icon: <SaveOutlined />,
      accountNumber: '****4321',
      balance: 45250.5,
      isPositive: true,
      status: 'Active',
    },
    {
      type: 'Credit Card',
      icon: <CreditCardOutlined />,
      accountNumber: '****9876',
      balance: -1245.8,
      isNegative: true,
      status: 'Active',
    },
  ];

  return (
    <AccountsList>
      {accounts.map((account, index) => (
        <AccountCard key={index}>
          <AccountTypeHeader>
            {account.icon}
            <AccountTypeTitle>{account.type}</AccountTypeTitle>
          </AccountTypeHeader>

          <AccountDetails>
            <AccountDetailItem>
              <AccountDetailTitle>Account Number</AccountDetailTitle>
              <AccountDetailValue>{account.accountNumber}</AccountDetailValue>
            </AccountDetailItem>

            <AccountDetailItem>
              <AccountDetailTitle>Balance</AccountDetailTitle>
              <AccountDetailValue
                isPositive={account.isPositive}
                isNegative={account.isNegative}
              >
                {account.balance >= 0 ? '+' : ''}$
                {Math.abs(account.balance).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </AccountDetailValue>
            </AccountDetailItem>

            <AccountDetailItem>
              <StatusBadge>{account.status}</StatusBadge>
            </AccountDetailItem>
          </AccountDetails>
        </AccountCard>
      ))}
    </AccountsList>
  );
};

export default AccountTab;
