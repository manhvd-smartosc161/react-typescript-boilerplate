import styled from 'styled-components';

interface StyledAvatarProps {
  $variant?: 'circle' | 'square';
}

export const StyledAvatar = styled.div<StyledAvatarProps>`
  display: inline-block;
`;
