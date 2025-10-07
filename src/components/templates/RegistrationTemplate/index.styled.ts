import { styled, Box, Stack } from '@mui/material';

export const StyledRegistrationTemplate = styled(Stack)(({}) => ({
  minHeight: '100vh',
  backgroundColor: '#FFFFFF',
}));

export const StyledStickyHeader = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
  padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
}));

export const StyledFormContent = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
}));
