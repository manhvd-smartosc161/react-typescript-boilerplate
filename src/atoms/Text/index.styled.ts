import styled from 'styled-components';

interface StyledTextProps {
  $variant?: 'body1' | 'body2' | 'caption' | 'label';
  $color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'default';
  $weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  $align?: 'left' | 'center' | 'right';
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

const getFontWeight = (weight?: string) => {
  switch (weight) {
    case 'medium':
      return 500;
    case 'semibold':
      return 600;
    case 'bold':
      return 700;
    default:
      return 400;
  }
};

export const StyledText = styled.span<StyledTextProps>`
  .ant-typography {
    color: ${({ $color }) => getColorValue($color)};
    font-weight: ${({ $weight }) => getFontWeight($weight)};
    text-align: ${({ $align }) => $align || 'left'};

    ${({ $variant }) => {
      switch ($variant) {
        case 'body1':
          return 'font-size: 14px; line-height: 22px;';
        case 'body2':
          return 'font-size: 12px; line-height: 20px;';
        case 'caption':
          return 'font-size: 11px; line-height: 18px;';
        case 'label':
          return 'font-size: 13px; line-height: 20px; font-weight: 500;';
        default:
          return '';
      }
    }}
  }
`;
