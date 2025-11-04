import { Stack, styled } from '@mui/material';

export const StyledToolbarRow = styled(Stack)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  flexDirection: 'column',
  gap: theme.spacing(1.25),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1.5),
  },
}));
