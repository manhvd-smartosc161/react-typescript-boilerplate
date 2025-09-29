import styled, { css } from 'styled-components';
import { theme } from '@src/styles/theme';

type TypographyVariant =
  | 'titleLarge'
  | 'titleSmall'
  | 'headingHuge'
  | 'headingExtraLarge'
  | 'headingLarge'
  | 'headingMedium'
  | 'headingSmall'
  | 'headingExtraSmall'
  | 'bodyExtraLarge'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'bodyExtraSmall'
  | 'bodyTiny';

interface StyledTypographyProps {
  $variant: TypographyVariant;
}

const getVariantStyles = (variant: TypographyVariant) => {
  switch (variant) {
    // TITLE STYLES
    case 'titleLarge':
      return css`
        font-size: 120px;
        line-height: 150px;
        letter-spacing: -0.02em;
        font-weight: ${theme.typography.fontWeights.bold};
      `;
    case 'titleSmall':
      return css`
        font-size: 96px;
        line-height: 120px;
        letter-spacing: -0.02em;
        font-weight: ${theme.typography.fontWeights.bold};
      `;

    // HEADING STYLES
    case 'headingHuge':
      return css`
        font-size: 72px;
        line-height: 90px;
        letter-spacing: -0.02em;
        font-weight: ${theme.typography.fontWeights.bold};
      `;
    case 'headingExtraLarge':
      return css`
        font-size: 60px;
        line-height: 72px;
        letter-spacing: -0.02em;
      `;
    case 'headingLarge':
      return css`
        font-size: 48px;
        line-height: 60px;
        letter-spacing: -0.02em;
      `;
    case 'headingMedium':
      return css`
        font-size: 36px;
        line-height: 44px;
        letter-spacing: -0.02em;
      `;
    case 'headingSmall':
      return css`
        font-size: 30px;
        line-height: 38px;
        letter-spacing: 0;
        font-weight: ${theme.typography.fontWeights.medium};
      `;
    case 'headingExtraSmall':
      return css`
        font-size: 24px;
        line-height: 32px;
        letter-spacing: 0;
        font-weight: ${theme.typography.fontWeights.medium};
      `;

    // BODY TEXT STYLES
    case 'bodyExtraLarge':
      return css`
        font-size: 20px;
        line-height: 30px;
        letter-spacing: 0;
      `;
    case 'bodyLarge':
      return css`
        font-size: 18px;
        line-height: 28px;
        letter-spacing: 0;
      `;
    case 'bodyMedium':
      return css`
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0;
      `;
    case 'bodySmall':
      return css`
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0;
      `;
    case 'bodyExtraSmall':
      return css`
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 0;
      `;
    case 'bodyTiny':
      return css`
        font-size: 10px;
        line-height: 16px;
        letter-spacing: 0;
      `;
    default:
      return css``;
  }
};
//  font-family: ${theme.typography.fontFamily};
export const StyledTypography = styled.div<StyledTypographyProps>`
  margin: 0;
  color: ${theme.colors.textPrimary};

  transition: color 0.3s ease;

  ${({ $variant }) => getVariantStyles($variant)}
`;
