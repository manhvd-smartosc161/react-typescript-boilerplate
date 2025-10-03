import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledLoginForm = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
})) as typeof Box;

export const StyledLoginTip = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: '#f5f7fa',
  borderRadius: '8px',
  textAlign: 'center',
}));
