import { FC } from 'react';
import { DashboardTemplate } from '@src/templates';
import { Title, Card, Text } from '@src/atoms';

const FraudDetection: FC = () => {
  return (
    <DashboardTemplate>
      <Title level={2}>Fraud Detection</Title>
      <Card>
        <Text variant="body1">Fraud detection and prevention systems.</Text>
      </Card>
    </DashboardTemplate>
  );
};

export default FraudDetection;
