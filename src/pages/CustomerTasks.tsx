import { FC } from 'react';
import { DashboardTemplate } from '@src/templates';
import { Title, Card, Text } from '@src/atoms';

const CustomerTasks: FC = () => {
  return (
    <DashboardTemplate>
      <Title level={2}>Customer Tasks</Title>
      <Card>
        <Text variant="body1">Customer-related tasks and workflows.</Text>
      </Card>
    </DashboardTemplate>
  );
};

export default CustomerTasks;
