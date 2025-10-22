import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

interface StyledInputProps {
  $success?: boolean;
}

export const StyledInput = styled(TextField)<StyledInputProps>(({ theme }) => ({
  '&.MuiOutlinedInput-root': {
    height: 40,
  },
  '& .MuiOutlinedInput-input, & .MuiSelect-select': {
    padding: '10px 14px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
  },
  [theme.breakpoints.down('sm')]: {
    '&.MuiOutlinedInput-root': {
      height: 36,
    },
    '& .MuiOutlinedInput-input, & .MuiSelect-select': {
      padding: '8px 12px',
      fontSize: '14px',
    },
  },
}));
