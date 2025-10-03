import { styled } from '@mui/material/styles';
import { InputLabel } from '@mui/material';

interface StyledInputLabelProps {
  $color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'default';
  $weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export const StyledInputLabel = styled(InputLabel)<StyledInputLabelProps>(({
  theme,
  $color = 'default',
  $weight = 'medium',
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
      case 'info':
        return theme.palette.info.main;
      case 'default':
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
    marginBottom: theme.spacing(1),
    fontSize: '1rem',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    '&.Mui-focused': {
      color: getColor(),
    },
    '&.Mui-error': {
      color: theme.palette.error.main,
    },
    '&.MuiFormLabel-root': {
      position: 'relative',
      transform: 'none',
      transition: theme.transitions.create(['color'], {
        duration: theme.transitions.duration.short,
      }),
    },
  };
});
