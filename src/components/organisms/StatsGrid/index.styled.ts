import { Box } from '@mui/material';

export const StatsGridContainer = Box;

export const statsGridStyles = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(2, 1fr)',
    lg: 'repeat(4, 1fr)',
    xl: 'repeat(4, 1fr)',
  },
  gap: 2,
};
