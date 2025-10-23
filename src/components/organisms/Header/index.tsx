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
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { LanguageSwitcher } from '@src/components/molecules';
import { useTranslation } from 'react-i18next';
import { currentUserState, isAuthenticatedState } from '@src/stores';
import { useLogoutMutation } from '@src/hooks';
import {
  StyledAppBar,
  StyledHeaderContent,
  StyledUserProfileSection,
  StyledAvatar,
  StyledMenu,
  StyledMenuHeader,
  StyledLogoSection,
} from './index.styled';
import { LogoAtom } from '@src/components/atoms';

export interface HeaderProps {
  collapsed: boolean;
  onMobileToggle?: () => void;
  breadcrumbItems?: Array<{
    title: string | React.ReactNode;
    href?: string;
    onClick?: () => void;
  }>;
}

const Header: FC<HeaderProps> = ({ collapsed, onMobileToggle }) => {
  const { t } = useTranslation();
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
        <StyledLogoSection>
          <LogoAtom collapsed={collapsed} />
        </StyledLogoSection>
        <IconButton
          edge="start"
          onClick={onMobileToggle}
          sx={{ marginRight: 2, display: { xs: 'flex', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <StyledHeaderContent>
          <Typography>Auto CN Collection</Typography>
        </StyledHeaderContent>

        <Box sx={{ flex: 1, display: { xs: 'block', md: 'none' } }} />

        <LanguageSwitcher />

        {isAuthenticated && (
          <>
            <StyledUserProfileSection
              direction="row"
              spacing={1.5}
              alignItems="center"
              onClick={handleMenuOpen}
            >
              <StyledAvatar
                src={currentUser?.avatar}
                alt={currentUser?.name || t('user:user')}
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
                    alt={currentUser?.name || t('user:user')}
                    sx={{ width: 40, height: 40 }}
                  >
                    <PersonIcon />
                  </Avatar>
                  <Stack>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {currentUser?.name || t('user:loading')}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {currentUser?.email || t('user:loading')}
                    </Typography>
                  </Stack>
                </Stack>
              </StyledMenuHeader>
              <Divider />
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                {t('user:profile')}
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                {t('common:settings')}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="error" />
                </ListItemIcon>
                <Typography color="error">{t('common:logout')}</Typography>
              </MenuItem>
            </StyledMenu>
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
