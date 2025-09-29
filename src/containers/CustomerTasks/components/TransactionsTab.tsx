import { FC } from 'react';
import { DollarCircleOutlined } from '@ant-design/icons';
import {
  TransactionsContainer,
  TransactionsList,
  TransactionItem,
  TransactionLeft,
  TransactionIcon,
  TransactionInfo,
  TransactionTitle,
  TransactionDetails,
  TransactionRight,
  TransactionAmount,
  TransactionBalance,
  TransactionStatus,
  TransactionTime,
} from '../index.styled';

interface Transaction {
  id: string;
  title: string;
  description: string;
  amount: number;
  balance: number;
  status: 'Completed' | 'Pending' | 'Failed';
  time: string;
  type: 'credit' | 'debit';
}

const TransactionsTab: FC = () => {
  const transactions: Transaction[] = [
    {
      id: '1',
      title: 'Salary Deposit - Tech Solutions Inc.',
      description: '****4521 • transfer',
      amount: 2500.0,
      balance: 125750.25,
      status: 'Completed',
      time: '9:30:00 PM',
      type: 'credit',
    },
    {
      id: '2',
      title: 'Rent Payment - Landlord Services',
      description: '****4521 • transfer',
      amount: -2500.0,
      balance: 125750.25,
      status: 'Completed',
      time: '9:30:00 PM',
      type: 'debit',
    },
    {
      id: '3',
      title: 'Grocery Store Purchase - FreshMart',
      description: '****4521 • debit card',
      amount: -156.78,
      balance: 125593.47,
      status: 'Completed',
      time: '2:15:30 PM',
      type: 'debit',
    },
    {
      id: '4',
      title: 'Online Transfer - Savings Account',
      description: '****4521 • transfer',
      amount: -1000.0,
      balance: 124593.47,
      status: 'Completed',
      time: '10:45:12 AM',
      type: 'debit',
    },
    {
      id: '5',
      title: 'ATM Withdrawal',
      description: '****4521 • ATM',
      amount: -200.0,
      balance: 124393.47,
      status: 'Completed',
      time: '8:20:45 AM',
      type: 'debit',
    },
    {
      id: '6',
      title: 'Direct Deposit - Freelance Payment',
      description: '****4521 • transfer',
      amount: 850.0,
      balance: 125243.47,
      status: 'Pending',
      time: '7:30:00 AM',
      type: 'credit',
    },
  ];

  const formatAmount = (amount: number) => {
    const isPositive = amount > 0;
    const formattedAmount = Math.abs(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${isPositive ? '+' : '-'}$${formattedAmount}`;
  };

  const formatBalance = (balance: number) => {
    return `$${balance.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <TransactionsContainer>
      <TransactionsList>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id}>
            <TransactionLeft>
              <TransactionIcon type={transaction.type}>
                <DollarCircleOutlined />
              </TransactionIcon>
              <TransactionInfo>
                <TransactionTitle>{transaction.title}</TransactionTitle>
                <TransactionDetails>
                  {transaction.description}
                </TransactionDetails>
              </TransactionInfo>
            </TransactionLeft>

            <TransactionRight>
              <TransactionAmount isPositive={transaction.amount > 0}>
                {formatAmount(transaction.amount)}
              </TransactionAmount>
              <TransactionBalance>
                Balance: {formatBalance(transaction.balance)}
              </TransactionBalance>
              <TransactionStatus status={transaction.status}>
                {transaction.status}
              </TransactionStatus>
              <TransactionTime>{transaction.time}</TransactionTime>
            </TransactionRight>
          </TransactionItem>
        ))}
      </TransactionsList>
    </TransactionsContainer>
  );
};

export default TransactionsTab;
