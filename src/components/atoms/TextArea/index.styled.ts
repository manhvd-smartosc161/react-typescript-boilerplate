import { styled, alpha } from '@mui/material/styles';
import { TextField } from '@mui/material';

interface StyledTextAreaProps {
  $success?: boolean;
}

export const StyledTextArea = styled(TextField)<StyledTextAreaProps>(
  () => ({}),
);
