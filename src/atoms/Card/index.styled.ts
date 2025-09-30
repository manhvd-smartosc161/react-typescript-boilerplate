import styled from 'styled-components';

interface StyledCardProps {
  $variant?: 'default' | 'bordered' | 'elevated';
}

export const StyledCard = styled.div<StyledCardProps>`
  .ant-card {
    ${({ $variant }) => {
      switch ($variant) {
        case 'bordered':
          return `
            border: 2px solid #e6e6e6;
          `;
        case 'elevated':
          return `
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            border: none;
          `;
        default:
          return '';
      }
    }}
  }
`;
