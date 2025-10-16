import { FC } from 'react';
import { IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { AvatarAtom, TextAtom } from '@src/components/atoms';
import { StyledUserProfile, StyledUserInfo } from './index.styled';

export interface UserProfileProps {
  name: string;
  role: string;
  avatarUrl?: string;
  onSettingsClick?: () => void;
  collapsed?: boolean;
}

const UserProfileMolecule: FC<UserProfileProps> = ({
  name,
  role,
  avatarUrl,
  onSettingsClick,
  collapsed = false,
}) => {
  return (
    <StyledUserProfile collapsed={collapsed}>
      <AvatarAtom src={avatarUrl}>{!avatarUrl && <PersonIcon />}</AvatarAtom>
      {!collapsed && (
        <>
          <StyledUserInfo>
            <TextAtom variant="body1" weight="semibold">
              {name}
            </TextAtom>
            <TextAtom variant="caption" color="secondary">
              {role}
            </TextAtom>
          </StyledUserInfo>
          <IconButton size="small" onClick={onSettingsClick}>
            <SettingsIcon fontSize="small" />
          </IconButton>
        </>
      )}
    </StyledUserProfile>
  );
};

export default UserProfileMolecule;
