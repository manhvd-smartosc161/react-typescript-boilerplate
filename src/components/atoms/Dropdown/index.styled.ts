import { styled } from '@mui/material/styles';
import { Select, FormControl } from '@mui/material';
import { theme } from '@src/config/theme';

interface StyledDropdownProps {
  $success?: boolean;
}

interface StyledFormControlProps {
  $success?: boolean;
}

export const StyledDropdown = styled(Select)<StyledDropdownProps>(() => ({
  '& .MuiOutlinedInput-notchedOutline': {},
  '&.MuiOutlinedInput-root': {
    height: '40px',
  },
  '& .MuiSelect-select': {
    padding: '10px 14px',
    display: 'flex',
    alignItems: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    '&.MuiOutlinedInput-root': {
      height: '36px',
    },
    '& .MuiSelect-select': {
      padding: '8px 12px',
    },
  },
}));
export const StyledFormControl = styled(FormControl)<StyledFormControlProps>(
  () => ({
    '& .MuiInputLabel-root': {},
  }),
);
