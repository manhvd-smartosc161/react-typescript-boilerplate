import { FC, ReactNode } from 'react';
import { ButtonProps as MuiButtonProps } from '@mui/material';
import { StyledButton } from './index.styled';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'ghost'
    | 'text'
    | 'link';
  children?: ReactNode;
  icon?: ReactNode;
  block?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  loading?: boolean;
}

const ButtonAtom: FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  block,
  htmlType = 'button',
  loading,
  ...props
}) => {
  const muiVariant =
    variant === 'link' || variant === 'text' ? 'text' : 'contained';

  return (
    <StyledButton
      $variant={variant}
      variant={muiVariant}
      type={htmlType}
      disabled={loading || props.disabled}
      fullWidth={block}
      startIcon={icon}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </StyledButton>
  );
};

export default ButtonAtom;
