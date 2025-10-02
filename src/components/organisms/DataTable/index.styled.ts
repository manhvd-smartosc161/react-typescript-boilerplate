import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledDataTableContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
}));

export const StyledCardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
}));

export const StyledCardTitle = styled(Box)(() => ({
  fontSize: '1.25rem',
  fontWeight: 600,
}));
