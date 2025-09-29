import { FC } from 'react';
import { Card } from 'antd';
import { PageTitle } from './index.styled';

const FraudDetectionContainer: FC = () => {
  return (
    <div>
      <PageTitle>Fraud Detection</PageTitle>
      <Card>
        <p>Fraud detection and prevention page.</p>
      </Card>
    </div>
  );
};

export default FraudDetectionContainer;
