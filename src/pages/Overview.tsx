import { FC } from 'react';
import { DashboardTemplate } from '@src/templates';
import { Title, Card, Text } from '@src/atoms';

const Overview: FC = () => {
  return (
    <DashboardTemplate>
      <Title level={2}>Overview</Title>
      <Card>
        <Text variant="body1">
          Overview page with system metrics and insights.
        </Text>
      </Card>
    </DashboardTemplate>
  );
};

export default Overview;
