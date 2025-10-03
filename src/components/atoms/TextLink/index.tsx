import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { TypographyProps } from '@mui/material';
import { StyledTextLink } from './index.styled';

export interface TextLinkProps extends Omit<TypographyProps, 'variant'> {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: 'body1' | 'body2' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  underline?: 'none' | 'hover' | 'always';
  external?: boolean;
}

const TextLinkAtom: FC<TextLinkProps> = ({
  children,
  to,
  href,
  variant = 'body1',
  color = 'primary',
  weight = 'normal',
  underline = 'hover',
  external = false,
  ...props
}) => {
  const muiVariant = variant === 'label' ? 'body2' : variant;

  const linkProps = to
    ? { component: RouterLink, to }
    : {
        component: 'a',
        href: href || '#',
        target: external ? '_blank' : undefined,
        rel: external ? 'noopener noreferrer' : undefined,
      };

  return (
    <StyledTextLink
      variant={muiVariant}
      $color={color}
      $weight={weight}
      $underline={underline}
      {...linkProps}
      {...props}
    >
      {children}
    </StyledTextLink>
  );
};

export default TextLinkAtom;
