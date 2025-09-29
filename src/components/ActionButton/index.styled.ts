import styled, { css } from 'styled-components';
import { Button } from 'antd';
import { theme } from '@src/styles/theme';

interface StyledActionButtonProps {
  $variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
}

const getVariantStyles = (variant: string) => {
  switch (variant) {
    case 'success':
      return css`
        background-color: ${theme.colors.success};
        border-color: ${theme.colors.success};
        color: white;

        &:hover,
        &:focus {
          background-color: ${theme.colors.successDark};
          border-color: ${theme.colors.successDark};
        }
      `;
    case 'warning':
      return css`
        background-color: ${theme.colors.warning};
        border-color: ${theme.colors.warning};
        color: white;

        &:hover,
        &:focus {
          background-color: ${theme.colors.warningDark};
          border-color: ${theme.colors.warningDark};
        }
      `;
    case 'error':
      return css`
        background-color: ${theme.colors.error};
        border-color: ${theme.colors.error};
        color: white;

        &:hover,
        &:focus {
          background-color: ${theme.colors.errorDark};
          border-color: ${theme.colors.errorDark};
        }
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.background};
        border-color: ${theme.colors.border};
        color: ${theme.colors.textPrimary};

        &:hover,
        &:focus {
          background-color: ${theme.colors.backgroundSecondary};
          border-color: ${theme.colors.borderDark};
        }
      `;
    case 'ghost':
      return css`
        background-color: transparent;
        border-color: ${theme.colors.border};
        color: ${theme.colors.textPrimary};

        &:hover,
        &:focus {
          background-color: ${theme.colors.backgroundSecondary};
          border-color: ${theme.colors.primary};
          color: ${theme.colors.primary};
        }
      `;
    default:
      return css``;
  }
};

export const StyledActionButton = styled(Button)<StyledActionButtonProps>`
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeights.medium};
  transition: all 0.3s ease;
  box-shadow: ${theme.shadows.sm};

  &:hover {
    box-shadow: ${theme.shadows.md};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  ${({ $variant }) => getVariantStyles($variant)}
`;
