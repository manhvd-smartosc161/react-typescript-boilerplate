import { FC } from 'react';
import { CheckboxProps } from '@mui/material';
import { StyledCheckbox, StyledFormControlLabel } from './index.styled';

export interface CheckBoxProps extends Omit<CheckboxProps, 'color'> {
  label?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default';
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  indeterminate?: boolean;
}

const CheckBoxAtom: FC<CheckBoxProps> = ({
  label,
  color = 'primary',
  labelPlacement = 'end',
  indeterminate = false,
  ...props
}) => {
  const checkboxElement = (
    <StyledCheckbox
      color={color === 'default' ? 'primary' : color}
      indeterminate={indeterminate}
      $color={color}
      {...props}
    />
  );

  if (!label) {
    return checkboxElement;
  }

  return (
    <StyledFormControlLabel
      control={checkboxElement}
      label={label}
      labelPlacement={labelPlacement}
    />
  );
};

export default CheckBoxAtom;
