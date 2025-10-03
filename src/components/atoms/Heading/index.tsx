import { FC, ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';
import { StyledHeading } from './index.styled';

export interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default';
  className?: string;
  sx?: SxProps<Theme>;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

const HeadingAtom: FC<HeadingProps> = ({
  children,
  level = 1,
  color = 'default',
  className,
  sx,
  weight = 'semibold',
}) => {
  const variant = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return (
    <StyledHeading
      variant={variant}
      className={className}
      $color={color}
      $weight={weight}
      sx={sx}
    >
      {children}
    </StyledHeading>
  );
};

export default HeadingAtom;
