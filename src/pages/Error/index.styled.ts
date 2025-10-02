import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const StyledNotFoundContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  textAlign: 'center',
  gap: 24,
}));

export const StyledErrorCode = styled(Typography)(({ theme }) => ({
  fontSize: '6rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

export const StyledActionButtons = styled(Box)(() => ({
  display: 'flex',
  gap: 16,
  justifyContent: 'center',
}));
