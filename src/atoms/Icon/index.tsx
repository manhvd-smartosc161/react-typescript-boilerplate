import { FC, ReactNode } from 'react';
import { StyledIcon } from './index.styled';

export interface IconProps {
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
  onClick?: () => void;
}

const Icon: FC<IconProps> = ({
  children,
  size = 'medium',
  color,
  className,
  onClick,
}) => {
  return (
    <StyledIcon
      $size={size}
      $color={color}
      className={className}
      onClick={onClick}
    >
      {children}
    </StyledIcon>
  );
};

export default Icon;
