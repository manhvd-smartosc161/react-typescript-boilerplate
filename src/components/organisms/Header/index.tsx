import { FC, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  Toolbar,
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
import { useQueryClient } from '@tanstack/react-query';
import { authState, currentUserState, isAuthenticatedState } from '@src/stores';
import {
  StyledAppBar,
  StyledHeaderContent,
  StyledUserProfileSection,
  StyledAvatar,
  StyledMenu,
  StyledMenuHeader,
  StyledLogoSection,
  StyledMobileHeaderSection,
  StyledMobileHamburgerButton,
  StyledRightSection,
  StyledIcon,
  StyledIconContact,
} from './index.styled';
import { LogoAtom } from '@src/components/atoms';
import ROUTES from '@src/routes/route';
import { useNavigate } from 'react-router-dom';
import { tokenService } from '@src/api/services';
import { toast } from 'react-toastify';

export interface HeaderProps {
  collapsed: boolean;
  onMobileToggle?: () => void;
}

const Header: FC<HeaderProps> = ({ collapsed, onMobileToggle }) => {
  const { t } = useTranslation();
  const currentUser = useRecoilValue(currentUserState);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authState);
  const queryClient = useQueryClient();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    tokenService.removeToken();
    queryClient.clear();
    localStorage.clear();
    sessionStorage.clear();
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });

    toast.success('Logout successfully!');
    navigate(ROUTES.LOGIN);
  };

  return (
    <StyledAppBar position="sticky" color="default" elevation={0}>
      <Toolbar>
        <StyledLogoSection>
          <LogoAtom collapsed={collapsed} />
        </StyledLogoSection>

        <StyledMobileHeaderSection>
          <StyledMobileHamburgerButton edge="start" onClick={onMobileToggle}>
            <MenuIcon />
          </StyledMobileHamburgerButton>
          <Box ml={-2} mt={2}>
            <LogoAtom collapsed={false} />
          </Box>
        </StyledMobileHeaderSection>

        <StyledHeaderContent></StyledHeaderContent>

        <StyledRightSection>
          <LanguageSwitcher />

          {isAuthenticated && (
            <>
              <StyledIconContact onClick={() => navigate(ROUTES.CONTACT_US)}>
                <StyledIcon name="article" size={20} />
              </StyledIconContact>

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
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate(ROUTES.SETTINGS);
                  }}
                >
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
        </StyledRightSection>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
