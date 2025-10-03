import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

interface StyledStepIconProps {
  $size?: 'small' | 'medium' | 'large';
  $completed?: boolean;
  $error?: boolean;
  $active?: boolean;
}

export const StyledStepIcon = styled(Box)<StyledStepIconProps>(({
  theme,
  $size = 'medium',
  $completed = false,
  $error = false,
  $active = false,
}) => {
  const getSizeValue = () => {
    switch ($size) {
      case 'small':
        return 24;
      case 'large':
        return 32;
      default:
        return 28;
    }
  };

  const getBackgroundColor = () => {
    if ($error) {
      return theme.palette.error.main;
    }
    if ($completed) {
      return theme.palette.success.main;
    }
    if ($active) {
      return theme.palette.primary.main;
    }
    return theme.palette.grey[300];
  };

  const getColor = () => {
    if ($error || $completed || $active) {
      return theme.palette.common.white;
    }
    return theme.palette.text.secondary;
  };

  return {
    width: getSizeValue(),
    height: getSizeValue(),
    borderRadius: '50%',
    backgroundColor: getBackgroundColor(),
    color: getColor(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: `calc(${getSizeValue()}px * 0.6)`,
    fontWeight: 600,
    transition: theme.transitions.create(['background-color', 'color'], {
      duration: theme.transitions.duration.short,
    }),
  };
});
