import { styled, Box, Stack } from '@mui/material';

/**
 * Styled root container for the PageHeader
 */
export const StyledRoot = styled(Box)<{ keepHorizontalOnMobile?: boolean }>(
  ({ theme, keepHorizontalOnMobile }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      flexDirection: keepHorizontalOnMobile ? 'row' : 'column',
      alignItems: keepHorizontalOnMobile ? 'center' : 'flex-start',
      gap: theme.spacing(2),
      marginBottom: theme.spacing(1.5),
    },
    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(1.5),
    },
  }),
);

/**
 * Styled container for the left side content (leading action + title)
 */
export const StyledLeftGroup = styled(Stack)(() => ({
  // Base styles for the left group Stack
  // Additional styling can be added here if needed in the future
}));
