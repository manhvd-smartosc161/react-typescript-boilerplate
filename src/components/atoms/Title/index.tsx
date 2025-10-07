import { FC, ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';
import { StyledTitle } from './index.styled';

export interface TitleProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default';
  className?: string;
  sx?: SxProps<Theme>;
}

const TitleAtom: FC<TitleProps> = ({
  children,
  level = 1,
  color = 'default',
  className,
  sx,
}) => {
  const variant = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return (
    <StyledTitle variant={variant} className={className} $color={color} sx={sx}>
      {children}
    </StyledTitle>
  );
};

export default TitleAtom;
