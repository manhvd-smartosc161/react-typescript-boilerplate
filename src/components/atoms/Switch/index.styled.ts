import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';

export interface StyledSwitchProps extends SwitchProps {
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  customSize?: 'small' | 'medium' | 'large';
}

export const StyledSwitch = styled(Switch, {
  shouldForwardProp: (prop) =>
    !['activeColor', 'inactiveColor', 'thumbColor', 'customSize'].includes(
      prop as string,
    ),
})(({ theme, ...props }: { theme: any } & StyledSwitchProps) => {
  const {
    activeColor = '#4b43ea',
    inactiveColor,
    thumbColor = '#fff',
    customSize = 'medium',
  } = props;

  const sizes = {
    small: { width: 36, height: 20, thumb: 16, translate: 14 },
    medium: { width: 42, height: 26, thumb: 22, translate: 16 },
    large: { width: 52, height: 32, thumb: 28, translate: 20 },
  }[customSize];

  const trackInactive =
    inactiveColor ?? (theme.palette.mode === 'dark' ? '#39393D' : '#E9E9EA');

  return {
    width: sizes.width,
    height: sizes.height,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: `translateX(${sizes.translate}px)`,
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: activeColor,
          opacity: 1,
          border: 0,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: sizes.thumb,
      height: sizes.thumb,
      backgroundColor: thumbColor,
    },
    '& .MuiSwitch-track': {
      borderRadius: sizes.height / 2,
      backgroundColor: trackInactive,
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  };
});
