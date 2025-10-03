import { FC, ReactNode } from 'react';
import { InputLabelProps as MuiInputLabelProps } from '@mui/material';
import { StyledInputLabel } from './index.styled';

export interface InputLabelProps
  extends Omit<MuiInputLabelProps, 'variant' | 'color'> {
  children: ReactNode;
  variant?: 'standard' | 'outlined' | 'filled';
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'default';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  htmlFor?: string;
}

const InputLabelAtom: FC<InputLabelProps> = ({
  children,
  variant = 'outlined',
  color = 'default',
  weight = 'medium',
  htmlFor,
  ...props
}) => {
  const muiVariant =
    variant === 'standard'
      ? 'standard'
      : variant === 'filled'
        ? 'filled'
        : 'outlined';

  return (
    <StyledInputLabel
      variant={muiVariant}
      $color={color}
      $weight={weight}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </StyledInputLabel>
  );
};

export default InputLabelAtom;
