import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledNotificationForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
  },
})) as typeof Box;
