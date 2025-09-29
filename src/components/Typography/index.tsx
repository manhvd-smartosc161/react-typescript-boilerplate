import { FC, ReactNode } from 'react';
import { StyledTypography } from './index.styled';

export type TypographyVariant =
  // Titles
  | 'titleLarge'
  | 'titleSmall'
  // Headings
  | 'headingHuge'
  | 'headingExtraLarge'
  | 'headingLarge'
  | 'headingMedium'
  | 'headingSmall'
  | 'headingExtraSmall'
  // Body
  | 'bodyExtraLarge'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'bodyExtraSmall'
  | 'bodyTiny';

export interface TypographyProps {
  variant: TypographyVariant;
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const Typography: FC<TypographyProps> = ({
  variant = 'bodyMedium',
  children,
  className,
  as,
  ...props
}) => {
  const getDefaultElement = (
    textVariant: TypographyVariant,
  ): keyof JSX.IntrinsicElements => {
    // Title variants
    if (textVariant.startsWith('title')) {
      return 'h1';
    }

    // Heading variants
    if (textVariant.startsWith('heading')) {
      switch (textVariant) {
        case 'headingHuge':
        case 'headingExtraLarge':
          return 'h1';
        case 'headingLarge':
          return 'h2';
        case 'headingMedium':
          return 'h3';
        case 'headingSmall':
          return 'h4';
        case 'headingExtraSmall':
          return 'h5';
      }
    }

    // Body variants
    return 'p';
  };

  return (
    <StyledTypography
      $variant={variant}
      as={as || getDefaultElement(variant)}
      className={className}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};

export default Typography;
//  <Typography variant="titleLarge">Tiêu đề chính lớn</Typography>
