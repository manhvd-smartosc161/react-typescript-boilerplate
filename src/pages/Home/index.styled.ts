import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: '12px',
    boxShadow: 'none',
    border: '1px solid #e0e0e0',
  },
}));

export const StyledChartSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(1.5),
  },
}));

export const StyledTableSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(1.5),
    overflow: 'auto',
  },
}));
