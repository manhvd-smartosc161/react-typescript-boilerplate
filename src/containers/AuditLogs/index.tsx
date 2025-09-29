import { FC } from 'react';
import { Card } from 'antd';
import { PageTitle } from './index.styled';

const AuditLogsContainer: FC = () => {
  return (
    <div>
      <PageTitle>Audit Logs</PageTitle>
      <Card>
        <p>System audit logs and activity tracking page.</p>
      </Card>
    </div>
  );
};

export default AuditLogsContainer;
