import styled from 'styled-components';

interface StyledTitleProps {
  $color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'default';
}

const getColorValue = (color?: string) => {
  switch (color) {
    case 'primary':
      return '#1890ff';
    case 'secondary':
      return '#8c8c8c';
    case 'success':
      return '#52c41a';
    case 'warning':
      return '#faad14';
    case 'danger':
      return '#ff4d4f';
    default:
      return 'rgba(0, 0, 0, 0.85)';
  }
};

export const StyledTitle = styled.div<StyledTitleProps>`
  .ant-typography {
    color: ${({ $color }) => getColorValue($color)};
    margin-bottom: 16px;
  }
`;
