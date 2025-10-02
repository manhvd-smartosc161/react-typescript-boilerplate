import { FC, ReactNode } from 'react';
import { StyledIcon } from './index.styled';

export interface IconProps {
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
  onClick?: () => void;
}

const IconAtom: FC<IconProps> = ({
  children,
  size = 'medium',
  color,
  className,
  onClick,
}) => {
  return (
    <StyledIcon
      component="span"
      className={className}
      onClick={onClick}
      $size={size}
      $color={color}
      $clickable={!!onClick}
    >
      {children}
    </StyledIcon>
  );
};

export default IconAtom;
