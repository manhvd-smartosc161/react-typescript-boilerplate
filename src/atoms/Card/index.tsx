import { FC, ReactNode } from 'react';
import { Card as AntCard, CardProps as AntCardProps } from 'antd';
import { StyledCard } from './index.styled';

export interface CardProps extends Omit<AntCardProps, 'variant'> {
  children: ReactNode;
  variant?: 'default' | 'bordered' | 'elevated';
}

const Card: FC<CardProps> = ({ children, variant = 'default', ...props }) => {
  return (
    <StyledCard $variant={variant}>
      <AntCard {...props}>{children}</AntCard>
    </StyledCard>
  );
};

export default Card;
