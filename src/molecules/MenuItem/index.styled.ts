import styled from 'styled-components';

interface StyledMenuItemProps {
  $active?: boolean;
}

export const StyledMenuItem = styled.div<StyledMenuItemProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s;
  background-color: ${({ $active }) => ($active ? '#e6f7ff' : 'transparent')};
  color: ${({ $active }) => ($active ? '#1890ff' : 'rgba(0, 0, 0, 0.85)')};

  &:hover {
    background-color: ${({ $active }) => ($active ? '#e6f7ff' : '#f5f5f5')};
  }
`;
