import { FC } from 'react';
import { DashboardTemplate } from '@src/templates';
import { Title, Card, Text } from '@src/atoms';

const Reports: FC = () => {
  return (
    <DashboardTemplate>
      <Title level={2}>Reports</Title>
      <Card>
        <Text variant="body1">Reports and analytics page.</Text>
      </Card>
    </DashboardTemplate>
  );
};

export default Reports;
