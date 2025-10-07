import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

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

export const StyledChartSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

export const StyledTableSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));
