import styled from 'styled-components';
import { theme } from '@src/styles/theme';

interface IconWrapperProps {
  $color: 'primary' | 'success' | 'warning' | 'error' | 'info';
}

const getColorByVariant = (variant: string) => {
  switch (variant) {
    case 'primary':
      return theme.colors.primary;
    case 'success':
      return theme.colors.success;
    case 'warning':
      return theme.colors.warning;
    case 'error':
      return theme.colors.error;
    case 'info':
      return theme.colors.info;
    default:
      return theme.colors.primary;
  }
};

const getBackgroundByVariant = (variant: string) => {
  switch (variant) {
    case 'primary':
      return theme.colors.primaryLight;
    case 'success':
      return theme.colors.successLight;
    case 'warning':
      return theme.colors.warningLight;
    case 'error':
      return theme.colors.errorLight;
    case 'info':
      return theme.colors.infoLight;
    default:
      return theme.colors.primaryLight;
  }
};

export const StyledStatsCard = styled.div`
  .ant-card {
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.md};
    border: 1px solid ${theme.colors.borderLight};
    transition: all 0.3s ease;

    &:hover {
      box-shadow: ${theme.shadows.lg};
      transform: translateY(-2px);
    }
  }
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

export const IconWrapper = styled.div<IconWrapperProps>`
  width: 56px;
  height: 56px;
  border-radius: ${theme.borderRadius.lg};
  background: ${({ $color }) => getBackgroundByVariant($color)};
  color: ${({ $color }) => getColorByVariant($color)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSizes.xl};
`;

export const StatsValue = styled.div`
  font-size: ${theme.typography.fontSizes.xxxl};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.textPrimary};
  line-height: ${theme.typography.lineHeights.tight};
  margin-bottom: ${theme.spacing.xs};
`;

export const StatsTitle = styled.div`
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  font-weight: ${theme.typography.fontWeights.medium};
`;
