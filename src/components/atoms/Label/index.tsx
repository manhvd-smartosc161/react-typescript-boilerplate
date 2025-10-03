import { FC, ReactNode } from 'react';
import { TypographyProps } from '@mui/material';
import { StyledLabel } from './index.styled';

export interface LabelProps extends Omit<TypographyProps, 'variant'> {
  children: ReactNode;
  variant?: 'body1' | 'body2' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  required?: boolean;
}

const LabelAtom: FC<LabelProps> = ({
  children,
  variant = 'body2',
  color = 'default',
  weight = 'medium',
  required = false,
  ...props
}) => {
  const muiVariant = variant === 'label' ? 'body2' : variant;

  return (
    <StyledLabel
      variant={muiVariant}
      $color={color}
      $weight={weight}
      component={'label'}
      {...props}
    >
      {children}
      {required && <span style={{ color: '#ff4d4f', marginLeft: 4 }}>*</span>}
    </StyledLabel>
  );
};

export default LabelAtom;
