import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledRegisterForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
  },
})) as typeof Box;

export const StyledRegisterTip = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  padding: theme.spacing(1.5),
  backgroundColor: '#f5f7fa',
  borderRadius: '8px',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));
