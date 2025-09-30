import { FC } from 'react';
import { DashboardTemplate } from '@src/templates';
import { Title, Card, Text } from '@src/atoms';

const RiskManagement: FC = () => {
  return (
    <DashboardTemplate>
      <Title level={2}>Risk Management</Title>
      <Card>
        <Text variant="body1">Risk assessment and management tools.</Text>
      </Card>
    </DashboardTemplate>
  );
};

export default RiskManagement;
