import { FC, ReactNode, Suspense } from 'react';
import { Spin } from 'antd';
import { Card } from '@src/atoms';

export interface ChartCardProps {
  title?: string;
  children: ReactNode;
  loading?: boolean;
}

const ChartCard: FC<ChartCardProps> = ({
  title,
  children,
  loading = false,
}) => {
  return (
    <Card title={title} loading={loading} variant="elevated">
      <Suspense
        fallback={
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
          </div>
        }
      >
        {children}
      </Suspense>
    </Card>
  );
};

export default ChartCard;
