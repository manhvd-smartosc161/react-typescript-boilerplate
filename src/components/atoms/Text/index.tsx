import { FC, ReactNode } from 'react';
import { TypographyProps } from '@mui/material';
import { StyledText } from './index.styled';

export interface TextProps extends Omit<TypographyProps, 'variant'> {
  children: ReactNode;
  variant?: 'body1' | 'body2' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

const TextAtom: FC<TextProps> = ({
  children,
  variant = 'body1',
  color = 'default',
  weight = 'normal',
  ...props
}) => {
  const muiVariant = variant === 'label' ? 'body2' : variant;

  return (
    <StyledText variant={muiVariant} $color={color} $weight={weight} {...props}>
      {children}
    </StyledText>
  );
};

export default TextAtom;
