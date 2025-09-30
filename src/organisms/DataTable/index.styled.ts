import styled from 'styled-components';

interface StyledDataTableProps {
  $variant?: 'default' | 'striped' | 'bordered';
}

export const StyledDataTable = styled.div<StyledDataTableProps>`
  .ant-table {
    ${({ $variant }) => {
      switch ($variant) {
        case 'striped':
          return `
            .ant-table-tbody > tr:nth-child(even) {
              background-color: #fafafa;
            }
          `;
        case 'bordered':
          return `
            .ant-table-cell {
              border: 1px solid #f0f0f0;
            }
          `;
        default:
          return '';
      }
    }}
  }

  .ant-pagination {
    margin-top: 16px;
  }
`;
