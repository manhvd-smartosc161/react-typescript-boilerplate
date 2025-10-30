import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTableHeader = styled(Box)(({ theme }) => ({
  backgroundColor: '#EDF4FF',
  padding: theme.spacing(2, 3),
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}));
