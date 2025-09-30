import { FC } from 'react';
import { Row, Col } from 'antd';
import { StatCard, StatCardProps } from '@src/molecules';

export interface StatsGridProps {
  stats: StatCardProps[];
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

const StatsGrid: FC<StatsGridProps> = ({
  stats,
  columns = { xs: 24, sm: 12, md: 12, lg: 6, xl: 6 },
}) => {
  return (
    <Row gutter={[16, 16]}>
      {stats.map((stat, index) => (
        <Col key={index} {...columns}>
          <StatCard {...stat} />
        </Col>
      ))}
    </Row>
  );
};

export default StatsGrid;
