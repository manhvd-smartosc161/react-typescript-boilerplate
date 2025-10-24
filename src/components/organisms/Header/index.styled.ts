import { styled } from '@mui/material/styles';
import { AppBar, Box, Stack, Avatar, Menu, IconButton } from '@mui/material';
import { IconAtom } from '@src/components/atoms';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: 64,
  zIndex: theme.zIndex.drawer,
  boxShadow: '0px -4px 32px 0px #0000001A, 0px 0px 4px 0px #00000014',
  marginBottom: '3px',
  [theme.breakpoints.down('sm')]: {
    height: 56,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
}));

export const StyledHeaderContent = styled(Box)(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const StyledUserProfileSection = styled(Stack)(({ theme }) => ({
  cursor: 'pointer',
  padding: '6px 12px',
  borderRadius: '12px',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '4px 6px',
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 36,
  height: 36,
  border: '2px solid',
  borderColor: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    width: 28,
    height: 28,
  },
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: theme.spacing(1.5),
    minWidth: 220,
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
}));

export const StyledMenuHeader = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
}));

export const StyledLogoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const StyledMobileHeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
  flex: 1,
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const StyledMobileHamburgerButton = styled(IconButton)(({ theme }) => ({
  marginRight: 0.5,
}));

export const StyledRightSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1,
}));

export const StyledIconContact = styled(Box)(() => ({
  padding: '10px',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

export const StyledIcon = styled(IconAtom)({
  display: 'block',
});
