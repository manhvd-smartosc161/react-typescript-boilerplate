import { styled } from '@mui/material';

export const StyledFormFieldset = styled('fieldset')(({ theme }) => ({
  border: 'none',
  padding: 0,
  margin: 0,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1.5),
  },
}));
