import { FC } from 'react';
import { Card } from 'antd';
import { PageTitle } from './index.styled';

const TransactionsContainer: FC = () => {
  return (
    <div>
      <PageTitle>Transactions</PageTitle>
      <Card>
        <p>Transaction history and management page.</p>
      </Card>
    </div>
  );
};

export default TransactionsContainer;
