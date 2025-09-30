import { FC } from 'react';
import { DashboardTemplate } from '@src/templates';
import { Title, Card, Text } from '@src/atoms';

const Accounts: FC = () => {
  return (
    <DashboardTemplate>
      <Title level={2}>Accounts</Title>
      <Card>
        <Text variant="body1">Account management and information page.</Text>
      </Card>
    </DashboardTemplate>
  );
};

export default Accounts;
