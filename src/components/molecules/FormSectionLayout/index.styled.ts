import { styled, Grid } from '@mui/material';
import { theme } from '@src/config/theme';

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

export const StyledContentGrid = styled(Grid)(() => ({
  width: '100%',
  // paddingTop: theme.spacing(2),
}));
