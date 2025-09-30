import styled from 'styled-components';

interface StyledInputProps {
  $variant?: 'default' | 'filled' | 'borderless';
}

export const StyledInput = styled.div<StyledInputProps>`
  .ant-input {
    ${({ $variant }) => {
      switch ($variant) {
        case 'filled':
          return `
            background-color: #f5f5f5;
            border-color: #f5f5f5;
            &:hover, &:focus {
              background-color: #e6e6e6;
            }
          `;
        case 'borderless':
          return `
            border: none;
            box-shadow: none;
          `;
        default:
          return '';
      }
    }}
  }
`;
