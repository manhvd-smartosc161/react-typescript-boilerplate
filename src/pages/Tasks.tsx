import { FC } from 'react';
import { DashboardTemplate } from '@src/templates';
import { Title, Card, Text } from '@src/atoms';

const Tasks: FC = () => {
  return (
    <DashboardTemplate>
      <Title level={2}>Tasks</Title>
      <Card>
        <Text variant="body1">Task management and tracking page.</Text>
      </Card>
    </DashboardTemplate>
  );
};

export default Tasks;
