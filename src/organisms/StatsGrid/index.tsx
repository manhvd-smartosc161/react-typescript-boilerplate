import { FC } from 'react';
import { Grid } from '@mui/material';
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
  columns = { xs: 12, sm: 6, md: 6, lg: 3, xl: 3 },
}) => {
  return (
    <Grid container spacing={2}>
      {stats.map((stat, index) => (
        <Grid key={index} {...({ item: true, ...columns } as any)}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsGrid;
