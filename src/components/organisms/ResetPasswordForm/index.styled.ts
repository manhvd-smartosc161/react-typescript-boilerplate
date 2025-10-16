import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledResetPasswordForm = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
    maxWidth: '100%',
  },
}));
