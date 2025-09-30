import { FC } from 'react';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Text, Button } from '@src/atoms';
import {
  UserProfileWrapper,
  UserInfo,
  SettingsButton,
} from './index.styled';

export interface UserProfileProps {
  name: string;
  role: string;
  avatarUrl?: string;
  onSettingsClick?: () => void;
  collapsed?: boolean;
}

const UserProfile: FC<UserProfileProps> = ({
  name,
  role,
  avatarUrl,
  onSettingsClick,
  collapsed = false,
}) => {
  return (
    <UserProfileWrapper $collapsed={collapsed}>
      <Avatar size={40} src={avatarUrl} icon={<UserOutlined />} />
      {!collapsed && (
        <>
          <UserInfo>
            <Text variant="body1" weight="semibold">
              {name}
            </Text>
            <Text variant="caption" color="secondary">
              {role}
            </Text>
          </UserInfo>
          <SettingsButton>
            <Button
              variant="ghost"
              size="small"
              icon={<SettingOutlined />}
              onClick={onSettingsClick}
            />
          </SettingsButton>
        </>
      )}
    </UserProfileWrapper>
  );
};

export default UserProfile;
