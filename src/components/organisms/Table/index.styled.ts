import { TableHead, TableRow, TableCell, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ButtonAtom } from '@src/components/atoms';

export const StyledTableContainer = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: '1px solid #E0E0E0',
  overflow: 'hidden',
  backgroundColor: 'white',
  [theme.breakpoints.down('md')]: {
    overflow: 'auto',
    boxShadow: 'none',
    border: '1px solid #e0e0e0',
    '& .MuiTable-root': {
      minWidth: 600,
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiTable-root': {
      minWidth: 500,
    },
  },
}));

export const StyledTableHead = styled(TableHead)(() => ({
  backgroundColor: '#fff',
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

export const StyledTableFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(3),
  gap: 2,
}));

export const StyledTablePagination = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(3),
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const StyledLoadMore = styled(ButtonAtom)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}));
