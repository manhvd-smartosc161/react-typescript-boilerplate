import { FC } from 'react';
import { DashboardTemplate } from '@src/templates';
import { Title, Card, Text } from '@src/atoms';

const AuditLogs: FC = () => {
  return (
    <DashboardTemplate>
      <Title level={2}>Audit Logs</Title>
      <Card>
        <Text variant="body1">System audit logs and activity tracking.</Text>
      </Card>
    </DashboardTemplate>
  );
};

export default AuditLogs;
