import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledChartTitle = styled(Box)(({ theme }) => ({
  fontSize: '1.125rem',
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    marginBottom: theme.spacing(1),
  },
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));
