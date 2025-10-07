import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

export const StyledForgotPasswordForm = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

export const StyledResendButton = styled(Button)(() => ({
  marginBottom: '16px',
  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important',
  color: 'white !important',
  '&:hover': {
    background: 'linear-gradient(135deg, #e685f0 0%, #f04a5a 100%) !important',
  },
  '&:disabled': {
    background: '#ccc !important',
    color: '#666 !important',
  },
}));
