import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

interface StyledTextLinkProps {
  $color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'default';
  $weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  $underline?: 'none' | 'hover' | 'always';
}

export const StyledTextLink = styled(Typography)<StyledTextLinkProps>(({
  theme,
  $color = 'primary',
  $weight = 'normal',
  $underline = 'hover',
}) => {
  const getColor = () => {
    switch ($color) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.text.secondary;
      case 'success':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'error':
        return theme.palette.error.main;
      default:
        return theme.palette.text.primary;
    }
  };

  const getFontWeight = () => {
    switch ($weight) {
      case 'medium':
        return 500;
      case 'semibold':
        return 600;
      case 'bold':
        return 700;
      default:
        return 400;
    }
  };

  const getTextDecoration = () => {
    switch ($underline) {
      case 'none':
        return 'none';
      case 'always':
        return 'underline';
      default:
        return 'none';
    }
  };

  return {
    color: getColor(),
    fontWeight: getFontWeight(),
    textDecoration: getTextDecoration(),
    cursor: 'pointer',
    transition: theme.transitions.create(['color', 'text-decoration'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      color: $color === 'primary' ? theme.palette.primary.dark : getColor(),
      textDecoration: $underline !== 'none' ? 'underline' : 'none',
    },
  };
});
