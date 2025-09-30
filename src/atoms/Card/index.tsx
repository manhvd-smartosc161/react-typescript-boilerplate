import { FC, ReactNode } from 'react';
import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';

export interface CardProps extends Omit<MuiCardProps, 'variant'> {
  children: ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
}

const Card: FC<CardProps> = ({ children, variant = 'default', ...props }) => {
  const muiVariant: 'elevation' | 'outlined' =
    variant === 'outlined' ? 'outlined' : 'elevation';
  const elevation = variant === 'elevated' ? 4 : variant === 'default' ? 1 : 0;

  return (
    <MuiCard
      variant={muiVariant}
      elevation={elevation}
      sx={{
        padding: 2,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </MuiCard>
  );
};

export default Card;
