import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

export const StyledButton = styled(MuiButton)<{ $variant?: string }>(({
  theme,
  $variant,
}) => {
  const getStyles = () => {
    switch ($variant) {
      case 'primary':
        return {
          textTransform: 'none' as const,
          backgroundColor: theme.palette.primary.main,
          color: '#fff',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        };
      case 'secondary':
        return {
          textTransform: 'none' as const,
          backgroundColor: 'white',
          color: 'black',
          '&:hover': {
            backgroundColor: 'white',
          },
        };
      case 'success':
        return {
          textTransform: 'none' as const,
          backgroundColor: '#52c41a',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#73d13d',
          },
        };
      case 'warning':
        return {
          textTransform: 'none' as const,
          backgroundColor: '#faad14',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#ffc53d',
          },
        };
      case 'danger':
        return {
          textTransform: 'none' as const,
          backgroundColor: theme.palette.error.main,
          color: '#fff',
          '&:hover': {
            backgroundColor: theme.palette.error.dark,
          },
        };
      case 'ghost':
        return {
          textTransform: 'none' as const,
          backgroundColor: 'transparent',
          border: `1px solid ${theme.palette.divider}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        };
      case 'text':
        return {
          textTransform: 'none' as const,
          backgroundColor: 'transparent',
          color: theme.palette.primary.main,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        };
      case 'link':
        return {
          textTransform: 'none' as const,
          backgroundColor: 'transparent',
          color: theme.palette.primary.main,
          textDecoration: 'underline',
          '&:hover': {
            backgroundColor: 'transparent',
            textDecoration: 'underline',
          },
        };
      default:
        return {};
    }
  };

  return getStyles();
});
