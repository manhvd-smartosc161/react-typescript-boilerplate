import { FC, ReactNode } from 'react';
import { SxProps, Theme, TypographyProps } from '@mui/material';
import { StyledTitle } from './index.styled';

export interface TitleProps extends Omit<TypographyProps, 'variant' | 'color'> {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default';
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
}

const TitleAtom: FC<TitleProps> = ({
  children,
  variant = 'h1',
  color = 'default',
  align = 'inherit',
  gutterBottom = false,
  noWrap = false,
  paragraph = false,
  className,
  sx,
  ...rest
}) => {
  return (
    <StyledTitle
      variant={variant}
      className={className}
      $color={color}
      align={align}
      gutterBottom={gutterBottom}
      noWrap={noWrap}
      paragraph={paragraph}
      sx={sx}
      {...rest}
    >
      {children}
    </StyledTitle>
  );
};

export default TitleAtom;
