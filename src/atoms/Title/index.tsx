import { FC, ReactNode } from 'react';
import { Typography, SxProps, Theme } from '@mui/material';

export interface TitleProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default';
  className?: string;
  sx?: SxProps<Theme>;
}

const Title: FC<TitleProps> = ({
  children,
  level = 1,
  color = 'default',
  className,
  sx,
}) => {
  const variant = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

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

  return (
    <Typography
      variant={variant}
      className={className}
      sx={{
        color: getColor(),
        marginBottom: 2,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export default Title;
