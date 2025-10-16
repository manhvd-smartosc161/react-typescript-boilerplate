import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

interface StyledInputProps {
  $success?: boolean;
}

export const StyledInput = styled(TextField)<StyledInputProps>(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: '10px 14px',
    fontSize: '14px',
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiInputBase-input': {
      padding: '8px 12px',
      fontSize: '14px',
    },
  },
}));
