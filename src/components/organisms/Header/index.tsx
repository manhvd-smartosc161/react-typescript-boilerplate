import { FC, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  ListItemIcon,
  Divider,
  Avatar,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { BreadcrumbMolecule } from '@src/components/molecules';
import { currentUserState, isAuthenticatedState } from '@src/stores';
import { useLogoutMutation } from '@src/hooks';
import {
  StyledAppBar,
  StyledHeaderContent,
  StyledUserProfileSection,
  StyledUserInfo,
  StyledAvatar,
  StyledMenu,
  StyledMenuHeader,
} from './index.styled';

export interface HeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  breadcrumbItems?: Array<{
    title: string | React.ReactNode;
    href?: string;
    onClick?: () => void;
  }>;
}

const Header: FC<HeaderProps> = ({
  collapsed,
  onToggleCollapse,
  breadcrumbItems,
}) => {
  const currentUser = useRecoilValue(currentUserState);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const logoutMutation = useLogoutMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logoutMutation.mutate();
  };

  return (
    <StyledAppBar position="sticky" color="default" elevation={0}>
      <Toolbar>
        <IconButton
          edge="start"
          onClick={onToggleCollapse}
          sx={{ marginRight: 2 }}
        >
          {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>

        <StyledHeaderContent>
          <BreadcrumbMolecule items={breadcrumbItems} />
        </StyledHeaderContent>

        {isAuthenticated && (
          <>
            <StyledUserProfileSection
              direction="row"
              spacing={1.5}
              alignItems="center"
              onClick={handleMenuOpen}
            >
              <StyledUserInfo>
                <Typography variant="body2" fontWeight={600}>
                  {currentUser
                    ? `${currentUser.surname} ${currentUser.name}`
                    : 'Loading...'}
                </Typography>
              </StyledUserInfo>
              <StyledAvatar
                src={currentUser?.avatar}
                alt={currentUser?.name || 'User'}
              >
                <PersonIcon />
              </StyledAvatar>
            </StyledUserProfileSection>

            <StyledMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <StyledMenuHeader>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={currentUser?.avatar}
                    alt={currentUser?.name || 'User'}
                    sx={{ width: 40, height: 40 }}
                  >
                    <PersonIcon />
                  </Avatar>
                  <Stack>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {currentUser?.name || 'Loading...'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {currentUser?.email || 'Loading...'}
                    </Typography>
                  </Stack>
                </Stack>
              </StyledMenuHeader>
              <Divider />
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                <Typography color="error">Logout</Typography>
              </MenuItem>
            </StyledMenu>
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
