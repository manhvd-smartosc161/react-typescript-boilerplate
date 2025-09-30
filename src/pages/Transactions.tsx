import { FC } from 'react';
import { DashboardTemplate } from '@src/templates';
import { Title, Card, Text } from '@src/atoms';

const Transactions: FC = () => {
  return (
    <DashboardTemplate>
      <Title level={2}>Transactions</Title>
      <Card>
        <Text variant="body1">Transaction history and management page.</Text>
      </Card>
    </DashboardTemplate>
  );
};

export default Transactions;
