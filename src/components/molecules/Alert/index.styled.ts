import { Alert } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAlert = styled(Alert)(() => ({
  mt: 3,
  mb: 2,
  fontWeight: 600,
  fontSize: '14px',
  '& .MuiAlert-icon': {
    fontSize: '20px',
  },
})) as typeof Alert;
