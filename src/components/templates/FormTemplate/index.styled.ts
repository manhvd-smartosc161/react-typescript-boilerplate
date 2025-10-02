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
  padding: theme.spacing(2),
}));

export const StyledFormPaper = styled(Paper)<StyledFormContainerProps>(
  ({ theme, $maxWidth = 600 }) => ({
    width: '100%',
    maxWidth: $maxWidth,
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
  }),
);

export const StyledFormHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));
