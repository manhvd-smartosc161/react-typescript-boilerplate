import styled from 'styled-components';

interface ColorProps {
  $color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

const getColorValue = (color?: string) => {
  switch (color) {
    case 'primary':
      return '#1890ff';
    case 'success':
      return '#52c41a';
    case 'warning':
      return '#faad14';
    case 'danger':
      return '#ff4d4f';
    case 'info':
      return '#13c2c2';
    default:
      return '#1890ff';
  }
};

export const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const IconWrapper = styled.div<ColorProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: ${({ $color }) => `${getColorValue($color)}15`};
  color: ${({ $color }) => getColorValue($color)};
  font-size: 24px;
`;

export const StatValue = styled.div<ColorProps>`
  font-size: 24px;
  font-weight: 600;
  color: ${({ $color }) => getColorValue($color)};
  margin-bottom: 4px;
`;
