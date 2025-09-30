import { FC } from 'react';
import { DashboardTemplate } from '@src/templates';
import { Title, Card, Text } from '@src/atoms';

const General: FC = () => {
  return (
    <DashboardTemplate>
      <Title level={2}>General</Title>
      <Card>
        <Text variant="body1">General settings and information page.</Text>
      </Card>
    </DashboardTemplate>
  );
};

export default General;
