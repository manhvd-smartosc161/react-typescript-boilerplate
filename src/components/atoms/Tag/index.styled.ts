import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';

interface StyledTagProps {
  $color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'default';
}

export const StyledTag = styled(Chip)<StyledTagProps>(({
  theme,
  $color = 'default',
}) => {
  const getColors = () => {
    switch ($color) {
      case 'primary':
        return {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.dark,
        };
      case 'secondary':
        return {
          backgroundColor: theme.palette.grey[100],
          color: theme.palette.grey[800],
        };
      case 'success':
        return {
          backgroundColor: theme.palette.success.light,
          color: theme.palette.success.dark,
        };
      case 'warning':
        return {
          backgroundColor: theme.palette.warning.light,
          color: theme.palette.warning.dark,
        };
      case 'error':
        return {
          backgroundColor: theme.palette.error.light,
          color: theme.palette.error.dark,
        };
      case 'info':
        return {
          backgroundColor: theme.palette.info.light,
          color: theme.palette.info.dark,
        };
      default:
        return {
          backgroundColor: theme.palette.grey[100],
          color: theme.palette.grey[800],
        };
    }
  };

  const colors = getColors();

  return {
    backgroundColor: colors.backgroundColor,
    color: colors.color,
    '& .MuiChip-deleteIcon': {
      color: colors.color,
      '&:hover': {
        color: theme.palette.grey[600],
      },
    },
  };
});
