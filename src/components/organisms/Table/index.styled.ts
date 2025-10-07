import { TableContainer, TableHead, TableRow, TableCell } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTableContainer = styled(TableContainer)(() => ({
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: 'white',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
}));

export const StyledTableHead = styled(TableHead)(() => ({
  backgroundColor: '#f8f9fa',
}));

export const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
  color: '#495057',
  borderBottom: '2px solid #dee2e6',
}));

export const StyledTableRow = styled(TableRow)(() => ({
  '&:hover': {
    backgroundColor: '#f8f9fa',
  },
}));
