import styled from 'styled-components';

interface UserProfileWrapperProps {
  $collapsed?: boolean;
}

export const UserProfileWrapper = styled.div<UserProfileWrapperProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid #f0f0f0;
  background-color: #fff;
  justify-content: ${({ $collapsed }) =>
    $collapsed ? 'center' : 'flex-start'};
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const SettingsButton = styled.div`
  display: flex;
  align-items: center;
`;
