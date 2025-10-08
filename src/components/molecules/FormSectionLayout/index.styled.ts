import { styled, Paper, Grid } from '@mui/material';

export const StyledFormSectionContainer = styled(Grid)(() => ({
  width: '100%',
}));

export const StyledSidebar = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}));

export const StyledContentArea = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const StyledContentPaper = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '8px',
  width: '100%',
  padding: 16,
}));

export const StyledContentGrid = styled(Grid)(() => ({
  width: '100%',
}));
