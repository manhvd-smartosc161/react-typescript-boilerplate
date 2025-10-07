import { styled, Box, Stack } from '@mui/material';

/**
 * Styled root container for the PageHeader
 */
export const StyledRoot = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}));

/**
 * Styled container for the left side content (leading action + title)
 */
export const StyledLeftGroup = styled(Stack)(() => ({
  // Base styles for the left group Stack
  // Additional styling can be added here if needed in the future
}));
