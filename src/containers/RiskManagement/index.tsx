import { FC } from 'react';
import { Card } from 'antd';
import { PageTitle } from './index.styled';

const RiskManagementContainer: FC = () => {
  return (
    <div>
      <PageTitle>Risk Management</PageTitle>
      <Card>
        <p>Risk assessment and management page.</p>
      </Card>
    </div>
  );
};

export default RiskManagementContainer;
