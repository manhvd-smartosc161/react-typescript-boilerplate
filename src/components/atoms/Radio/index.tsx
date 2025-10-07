import { FC } from 'react';
import { RadioProps as MuiRadioProps } from '@mui/material';
import { StyledFormControlLabel, StyledRadio } from './index.styled';

export interface RadioProps extends Omit<MuiRadioProps, 'color'> {
  label?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default';
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  disabled?: boolean;
}

const RadioAtom: FC<RadioProps> = ({
  label,
  color = 'primary',
  labelPlacement = 'end',
  disabled = false,

  ...props
}) => {
  const radioElement = (
    <StyledRadio
      color={color === 'default' ? 'primary' : color}
      disabled={disabled}
      $color={color}
      {...props}
    />
  );

  if (!label) {
    return radioElement;
  }

  return (
    <StyledFormControlLabel
      control={radioElement}
      label={label}
      labelPlacement={labelPlacement}
      disabled={disabled}
    />
  );
};

export default RadioAtom;
