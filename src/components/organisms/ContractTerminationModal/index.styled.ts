import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const StyledSelectedSuppliers = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  fontSize: '0.875rem',
}));

export const StyledTextAreaWrapper = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
}));

export const StyledCharacterCount = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: 8,
  right: 12,
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  pointerEvents: 'none',
}));
