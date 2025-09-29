import { FC, ReactNode } from 'react';
import { ButtonProps } from 'antd';
import { StyledActionButton } from './index.styled';

interface ActionButtonProps extends Omit<ButtonProps, 'type' | 'variant'> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
  children: ReactNode;
}

const ActionButton: FC<ActionButtonProps> = ({
  variant = 'primary',
  children,
  ...props
}) => {
  const getButtonType = (btnVariant: string): ButtonProps['type'] => {
    switch (btnVariant) {
      case 'primary':
        return 'primary';
      case 'secondary':
      case 'ghost':
        return 'default';
      default:
        return 'primary';
    }
  };

  return (
    <StyledActionButton
      $variant={variant}
      type={getButtonType(variant)}
      {...props}
    >
      {children}
    </StyledActionButton>
  );
};

export default ActionButton;
