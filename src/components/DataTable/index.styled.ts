import styled from 'styled-components';
import { theme } from '@src/styles/theme';

interface StyledDataTableProps {
  $variant: 'default' | 'striped' | 'bordered';
}

export const StyledDataTable = styled.div<StyledDataTableProps>`
  .ant-table {
    border-radius: ${theme.borderRadius.lg};
    overflow: hidden;
    box-shadow: ${theme.shadows.md};

    .ant-table-thead > tr > th {
      background-color: ${theme.colors.backgroundSecondary};
      border-bottom: 2px solid ${theme.colors.border};
      font-weight: ${theme.typography.fontWeights.semibold};
      color: ${theme.colors.textPrimary};
    }

    .ant-table-tbody > tr:hover > td {
      background-color: ${theme.colors.primaryLight} !important;
    }

    ${({ $variant }) =>
      $variant === 'striped' &&
      `
      .ant-table-tbody > tr:nth-child(even) > td {
        background-color: ${theme.colors.backgroundSecondary};
      }
    `}

    ${({ $variant }) =>
      $variant === 'bordered' &&
      `
      .ant-table-tbody > tr > td {
        border-right: 1px solid ${theme.colors.borderLight};
      }
    `}
  }

  .ant-pagination {
    margin-top: ${theme.spacing.lg};
    text-align: center;

    .ant-pagination-item {
      border-radius: ${theme.borderRadius.md};
    }

    .ant-pagination-item-active {
      background-color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};

      a {
        color: white;
      }
    }
  }
`;
