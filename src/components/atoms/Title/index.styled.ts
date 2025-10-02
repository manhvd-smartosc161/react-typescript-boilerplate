import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

interface StyledTitleProps {
  $color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'default';
}

export const StyledTitle = styled(Typography)<StyledTitleProps>(({
  theme,
  $color = 'default',
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

  return {
    color: getColor(),
    marginBottom: theme.spacing(2),
  };
});
