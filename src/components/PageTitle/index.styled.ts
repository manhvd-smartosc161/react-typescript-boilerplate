import styled from 'styled-components';
import { theme } from '@src/styles/theme';

interface StyledPageTitleProps {
  $color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const getColorByVariant = (variant: string) => {
  switch (variant) {
    case 'primary':
      return theme.colors.primary;
    case 'secondary':
      return theme.colors.secondary;
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'error':
      return theme.colors.error;
    default:
      return theme.colors.primary;
  }
};

export const StyledPageTitle = styled.h1<StyledPageTitleProps>`
  margin: 0 0 ${theme.spacing.lg} 0;
  color: ${({ $color }) => getColorByVariant($color)};
  font-size: ${theme.typography.fontSizes.xxl};
  font-weight: ${theme.typography.fontWeights.semibold};
  line-height: ${theme.typography.lineHeights.tight};

  /* Responsive font sizes */
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSizes.xl};
  }
`;
