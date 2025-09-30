import { FC, ReactNode } from 'react';
import { Typography, TypographyProps } from '@mui/material';

export interface TextProps extends Omit<TypographyProps, 'variant'> {
  children: ReactNode;
  variant?: 'body1' | 'body2' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

const Text: FC<TextProps> = ({
  children,
  variant = 'body1',
  color = 'default',
  weight = 'normal',
  ...props
}) => {
  const muiVariant = variant === 'label' ? 'body2' : variant;

  const getColor = () => {
    switch (color) {
      case 'primary':
        return 'primary.main';
      case 'secondary':
        return 'text.secondary';
      case 'success':
        return 'success.main';
      case 'warning':
        return 'warning.main';
      case 'error':
        return 'error.main';
      default:
        return 'text.primary';
    }
  };

  const getFontWeight = () => {
    switch (weight) {
      case 'medium':
        return 500;
      case 'semibold':
        return 600;
      case 'bold':
        return 700;
      default:
        return 400;
    }
  };

  return (
    <Typography
      variant={muiVariant}
      sx={{
        color: getColor(),
        fontWeight: getFontWeight(),
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default Text;
