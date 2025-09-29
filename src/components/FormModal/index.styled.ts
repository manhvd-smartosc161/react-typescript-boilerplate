import styled from 'styled-components';
import { theme } from '@src/styles/theme';

export const StyledFormModal = styled.div`
  .ant-modal {
    .ant-modal-header {
      border-bottom: 1px solid ${theme.colors.borderLight};
      padding: ${theme.spacing.lg};

      .ant-modal-title {
        font-size: ${theme.typography.fontSizes.lg};
        font-weight: ${theme.typography.fontWeights.semibold};
        color: ${theme.colors.textPrimary};
      }
    }

    .ant-modal-body {
      padding: ${theme.spacing.lg};
    }

    .ant-modal-footer {
      border-top: 1px solid ${theme.colors.borderLight};
      padding: ${theme.spacing.md} ${theme.spacing.lg};
      text-align: right;

      .ant-btn + .ant-btn {
        margin-left: ${theme.spacing.sm};
      }
    }
  }

  .ant-form {
    .ant-form-item {
      margin-bottom: ${theme.spacing.md};

      .ant-form-item-label {
        padding-bottom: ${theme.spacing.xs};

        label {
          font-weight: ${theme.typography.fontWeights.medium};
          color: ${theme.colors.textPrimary};
        }
      }

      .ant-form-item-control {
        .ant-input,
        .ant-select-selector,
        .ant-input-number {
          border-radius: ${theme.borderRadius.md};
          border-color: ${theme.colors.border};

          &:hover {
            border-color: ${theme.colors.primary};
          }

          &:focus,
          &.ant-input-focused,
          &.ant-select-focused .ant-select-selector {
            border-color: ${theme.colors.primary};
            box-shadow: 0 0 0 2px ${theme.colors.primaryLight};
          }
        }
      }
    }
  }
`;
