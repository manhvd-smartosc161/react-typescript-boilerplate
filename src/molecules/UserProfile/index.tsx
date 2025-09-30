import { FC } from 'react';
import { Box, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Text } from '@src/atoms';

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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        padding: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}
    >
      <Avatar src={avatarUrl}>{!avatarUrl && <PersonIcon />}</Avatar>
      {!collapsed && (
        <>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Text variant="body1" weight="semibold">
              {name}
            </Text>
            <Text variant="caption" color="secondary">
              {role}
            </Text>
          </Box>
          <IconButton size="small" onClick={onSettingsClick}>
            <SettingsIcon fontSize="small" />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default UserProfile;
