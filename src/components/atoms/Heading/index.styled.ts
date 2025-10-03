import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

interface StyledHeadingProps {
  $color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'default';
  $weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export const StyledHeading = styled(Typography)<StyledHeadingProps>(({
  theme,
  $color = 'default',
  $weight = 'semibold',
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

  return {
    color: getColor(),
    fontWeight: getFontWeight(),
    marginBottom: theme.spacing(2),
  };
});
