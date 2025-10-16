import { styled, Box, Stack } from '@mui/material';

export const StyledRegistrationTemplate = styled(Stack)(({ theme }) => ({
  height: '100%',
  backgroundColor: '#f5f5f5',
  overflowY: 'scroll',
  overflowX: 'hidden',
  padding: `${theme.spacing(0)} ${theme.spacing(1.5)} ${theme.spacing(1.5)} ${theme.spacing(1.5)}`,
}));

export const StyledRegistrationContent = styled(Box)(() => ({
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#FFFFFF',
  overflow: 'hidden',
}));

export const StyledStickyHeaderContainer = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(0),
  zIndex: theme.zIndex.appBar,
  paddingTop: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: '#f5f5f5',
}));

export const StyledStickyHeader = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
  backgroundColor: '#FFFFFF',
  gap: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
}));

export const StyledFormContent = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
  backgroundColor: '#FFFFFF',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
}));
