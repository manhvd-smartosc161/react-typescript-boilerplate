import { FC, ReactNode } from 'react';
import { ButtonProps as AntButtonProps } from 'antd';
import { StyledButton } from './index.styled';

export interface ButtonProps
  extends Omit<AntButtonProps, 'type' | 'danger' | 'variant'> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'ghost'
    | 'link';
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  children,
  ...props
}) => {
  const getButtonType = (): AntButtonProps['type'] => {
    switch (variant) {
      case 'primary':
        return 'primary';
      case 'link':
        return 'link';
      case 'ghost':
        return 'default';
      default:
        return 'default';
    }
  };

  const getDanger = (): boolean => {
    return variant === 'danger';
  };

  return (
    <StyledButton
      $variant={variant}
      type={getButtonType()}
      danger={getDanger()}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
