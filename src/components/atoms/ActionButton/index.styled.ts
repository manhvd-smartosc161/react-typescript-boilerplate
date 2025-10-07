import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PrimaryButton = styled(Button)(() => ({
  backgroundColor: '#6f42c1',
  color: 'white',
  borderRadius: '4px',
  textTransform: 'none',
  fontWeight: 'bold',
  minWidth: '80px',
  '&:hover': {
    backgroundColor: '#5a32a3',
  },
}));

export const SuccessButton = styled(Button)(() => ({
  backgroundColor: '#28a745',
  color: 'white',
  borderRadius: '4px',
  textTransform: 'none',
  fontWeight: 'bold',
  minWidth: '80px',
  '&:hover': {
    backgroundColor: '#218838',
  },
}));

export const ActionButton = styled(Button)(() => ({
  backgroundColor: '#6f42c1',
  color: 'white',
  borderRadius: '4px',
  textTransform: 'none',
  fontWeight: 'bold',
  minWidth: '80px',
  '&:hover': {
    backgroundColor: '#5a32a3',
  },
}));

export const ReportButton = styled(Button)(() => ({
  backgroundColor: '#6f42c1',
  color: 'white',
  borderRadius: '6px',
  textTransform: 'none',
  fontWeight: 'bold',
  padding: '8px 16px',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#5a32a3',
  },
}));

export const DangerButton = styled(Button)(() => ({
  backgroundColor: '#dc3545',
  color: 'white',
  borderRadius: '4px',
  textTransform: 'none',
  fontWeight: 'bold',
  minWidth: '80px',
  '&:hover': {
    backgroundColor: '#c82333',
  },
}));
