import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledChartTitle = styled(Box)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
}));

export const LoadingContainer = styled(Box)(() => ({
  textAlign: 'center',
  padding: '50px',
  display: 'flex',
  justifyContent: 'center',
}));
