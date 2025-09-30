import { FC } from 'react';
import { DashboardTemplate } from '@src/templates';
import { Title, Card, Text } from '@src/atoms';

const Settings: FC = () => {
  return (
    <DashboardTemplate>
      <Title level={2}>System Settings</Title>
      <Card>
        <Text variant="body1">System configuration and settings page.</Text>
      </Card>
    </DashboardTemplate>
  );
};

export default Settings;
