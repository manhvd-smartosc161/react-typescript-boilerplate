import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

interface StyledFormContainerProps {
  $maxWidth?: string | number;
}

export const StyledFormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
  },
}));

export const StyledFormPaper = styled(Paper)<StyledFormContainerProps>(
  ({ theme, $maxWidth = 600 }) => ({
    width: '100%',
    maxWidth: $maxWidth,
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
      margin: theme.spacing(0.5),
      maxWidth: '100%',
    },
  }),
);

export const StyledFormHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: 'center',
}));
