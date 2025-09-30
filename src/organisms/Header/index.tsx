import { FC, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Stack,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { Breadcrumb } from '@src/molecules';
import { useAuth } from '@src/hooks';

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
  const { currentUser, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          onClick={onToggleCollapse}
          sx={{ marginRight: 2 }}
        >
          {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>

        <Box flex={1}>
          <Breadcrumb items={breadcrumbItems} />
        </Box>

        {/* User Profile Section (Recoil) */}
        {currentUser && (
          <>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '12px',
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
              onClick={handleMenuOpen}
            >
              <Box textAlign="right">
                <Typography variant="body2" fontWeight={600}>
                  {currentUser.fullName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {currentUser.department}
                </Typography>
              </Box>
              <Avatar
                src={currentUser.avatar}
                sx={{
                  width: 40,
                  height: 40,
                  border: '2px solid',
                  borderColor: 'primary.main',
                }}
              >
                {!currentUser.avatar && <PersonIcon />}
              </Avatar>
            </Stack>

            <Menu
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
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 220,
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <Box px={2} py={1.5}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {currentUser.fullName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {currentUser.email}
                </Typography>
              </Box>
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
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
