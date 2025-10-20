import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { theme } from '@src/config/theme';

export type StatusIconVariant = 'completed' | 'pending' | 'active';
export interface StatusIconFrameProps {
  children: React.ReactNode;
  variant?: StatusIconVariant;
  size?: number;
}

const themeColors: {
  [key in StatusIconVariant]: {
    outerGlow: string;
    innerCircle: string;
    icon: string;
  };
} = {
  completed: {
    outerGlow: '#F1F8FF',
    innerCircle: '#D8EAFB',
    icon: theme.palette.primary.main,
  },
  active: {
    outerGlow: '#F1F8FF',
    innerCircle: theme.palette.primary.main,
    icon: theme.palette.primary.light,
  },
  pending: {
    outerGlow: 'rgba(189, 189, 189, 0.3)',
    innerCircle: theme.palette.common.white,
    icon: theme.palette.grey[500],
  },
};

export const StyledFrame = styled(Box)<
  Pick<StatusIconFrameProps, 'size' | 'variant'>
>(({ size = 40, variant = 'completed' }) => {
  const colors = themeColors[variant];
  const outerSize = size;
  const innerSize = size * 0.8;

  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: outerSize,
    height: outerSize,

    backgroundColor: colors.outerGlow,
    borderRadius: '50%',

    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: innerSize,
      height: innerSize,
      backgroundColor: colors.innerCircle,
      borderRadius: '50%',
      zIndex: 1,
    },

    '& > *': {
      position: 'relative',
      zIndex: 1,
      width: `${size * 0.33}px`,
      height: `${size * 0.33}px`,
      color: colors.icon,
    },

    transition: theme.transitions.create(['background-color', 'color'], {
      duration: theme.transitions.duration.short,
    }),
  };
});
