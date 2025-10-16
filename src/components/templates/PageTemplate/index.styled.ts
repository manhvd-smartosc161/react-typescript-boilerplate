import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledPageHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
}));

export const StyledSubtitle = styled('p')(() => ({
  margin: 0,
  color: '#666',
}));
