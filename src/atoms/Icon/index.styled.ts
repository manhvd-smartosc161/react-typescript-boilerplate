import styled from 'styled-components';

interface StyledIconProps {
  $size?: 'small' | 'medium' | 'large';
  $color?: string;
}

const getSizeValue = (size?: string) => {
  switch (size) {
    case 'small':
      return '14px';
    case 'large':
      return '24px';
    default:
      return '18px';
  }
};

export const StyledIcon = styled.span<StyledIconProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ $size }) => getSizeValue($size)};
  color: ${({ $color }) => $color || 'currentColor'};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};

  svg {
    width: 1em;
    height: 1em;
  }
`;
