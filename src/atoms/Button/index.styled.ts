import styled from 'styled-components';
import { Button } from 'antd';

interface StyledButtonProps {
  $variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'ghost'
    | 'link';
}

export const StyledButton = styled(Button)<StyledButtonProps>`
  ${({ $variant }) => {
    switch ($variant) {
      case 'success':
        return `
          background-color: #52c41a;
          border-color: #52c41a;
          color: white;

          &:hover {
            background-color: #73d13d;
            border-color: #73d13d;
          }
        `;
      case 'warning':
        return `
          background-color: #faad14;
          border-color: #faad14;
          color: white;

          &:hover {
            background-color: #ffc53d;
            border-color: #ffc53d;
          }
        `;
      case 'secondary':
        return `
          background-color: #f0f0f0;
          border-color: #d9d9d9;
          color: rgba(0, 0, 0, 0.85);

          &:hover {
            background-color: #e6e6e6;
            border-color: #bfbfbf;
          }
        `;
      default:
        return '';
    }
  }}
`;
