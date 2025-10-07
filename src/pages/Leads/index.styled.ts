import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Box)(() => ({
  padding: '24px',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
}));

export const StyledPaper = styled(Paper)(() => ({
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
}));
