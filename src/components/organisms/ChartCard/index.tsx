import { FC, ReactNode } from 'react';
// import { CircularProgress } from '@mui/material';
import { CardAtom } from '@src/components/atoms';
import { StyledChartTitle } from './index.styled';

export interface ChartCardProps {
  title?: string;
  children: ReactNode;
  loading?: boolean;
}

const ChartCardOrganism: FC<ChartCardProps> = ({
  title,
  children,
  loading = false,
}) => {
  return (
    <CardAtom variant="elevated">
      {title && <StyledChartTitle>{title}</StyledChartTitle>}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>
      ) : (
        children
      )}
    </CardAtom>
  );
};

export default ChartCardOrganism;
