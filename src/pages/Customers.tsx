import { FC } from 'react';
import { DashboardTemplate } from '@src/templates';
import { Title, Card, Text } from '@src/atoms';

const Customers: FC = () => {
  return (
    <DashboardTemplate>
      <Title level={2}>Customers Management</Title>
      <Card>
        <Text variant="body1">Customer management and CRM page.</Text>
      </Card>
    </DashboardTemplate>
  );
};

export default Customers;
