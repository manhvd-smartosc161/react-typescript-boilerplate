import { styled } from '@mui/material/styles';
import { Select, FormControl } from '@mui/material';

interface StyledDropdownProps {
  $success?: boolean;
}

interface StyledFormControlProps {
  $success?: boolean;
}

export const StyledDropdown = styled(Select)<StyledDropdownProps>(() => ({
  '& .MuiSelect-select': {
    padding: '12px 16px',
  },
}));

export const StyledFormControl = styled(FormControl)<StyledFormControlProps>(
  () => ({
    '& .MuiInputLabel-root': {},
  }),
);
