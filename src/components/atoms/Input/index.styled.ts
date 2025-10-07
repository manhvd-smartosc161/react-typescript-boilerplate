import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

interface StyledInputProps {
  $success?: boolean;
}

export const StyledInput = styled(TextField)<StyledInputProps>(() => ({}));
