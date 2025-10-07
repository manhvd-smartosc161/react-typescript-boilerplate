import { FC } from 'react';
import { StatCardMolecule, StatCardProps } from '@src/components/molecules';
import {
  StatsGridContainer,
  statsGridStyles,
} from '@src/components/organisms/StatsGrid/index.styled';

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

const StatsGrid: FC<StatsGridProps> = ({ stats }) => {
  return (
    <StatsGridContainer sx={statsGridStyles}>
      {stats.map((stat, index) => (
        <StatCardMolecule key={index} {...stat} />
      ))}
    </StatsGridContainer>
  );
};

export default StatsGrid;
