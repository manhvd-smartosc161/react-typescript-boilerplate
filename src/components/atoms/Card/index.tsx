import { FC, ReactNode } from 'react';
import { CardProps as MuiCardProps } from '@mui/material';
import { StyledCard } from './index.styled';

export interface CardProps extends Omit<MuiCardProps, 'variant'> {
  children: ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
}

const CardAtom: FC<CardProps> = ({
  children,
  variant = 'default',
  ...props
}) => {
  const muiVariant: 'elevation' | 'outlined' =
    variant === 'outlined' ? 'outlined' : 'elevation';

  return (
    <StyledCard variant={muiVariant} $variant={variant} {...props}>
      {children}
    </StyledCard>
  );
};

export default CardAtom;
