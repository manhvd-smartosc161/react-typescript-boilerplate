import { styled, Paper, Grid, Box } from '@mui/material';

export const StyledFactoryPaper = styled(Paper)(() => ({
  padding: 16,
  border: '1px solid #E0E0E0',
  borderRadius: '12px',
}));

export const StyledConditionalSection = styled(Grid)(() => ({
  marginTop: 16,
}));

export const StyledStandardsSection = styled(Grid)(() => ({
  marginTop: 24,
}));

export const StyledCheckboxContainer = styled(Box)(() => ({
  marginTop: 16,
}));
