import { styled } from '@mui/material/styles';
import { Checkbox, FormControlLabel } from '@mui/material';

interface StyledCheckboxProps {
  $color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'default';
}

export const StyledCheckbox = styled(Checkbox)<StyledCheckboxProps>(({
  theme,
  $color = 'primary',
}) => {
  const getColor = () => {
    switch ($color) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'success':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'error':
        return theme.palette.error.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return {
    color: getColor(),
    '&.Mui-checked': {
      color: getColor(),
    },
    '&.MuiCheckbox-indeterminate': {
      color: getColor(),
    },
    '&.Mui-disabled': {
      color: theme.palette.grey[400],
    },
  };
});

export const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  margin: 0,
  '& .MuiFormControlLabel-label': {
    fontSize: '14px',
  },
}));
