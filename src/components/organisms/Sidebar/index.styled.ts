import { styled } from '@mui/material/styles';
import { Drawer, Box, Typography, ListItemButton, List } from '@mui/material';

interface StyledDrawerProps {
  collapsed?: boolean;
}

export const StyledDrawer = styled(Drawer)<StyledDrawerProps>(
  ({ collapsed = false, theme }) => ({
    width: collapsed ? 60 : 240,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: collapsed ? 60 : 240,
      height: '100vh',
      boxSizing: 'border-box',
      borderRight: 'none',
      transition: 'width 0.2s',
      boxShadow: '2px 0 8px rgba(0, 0, 0, 0.05)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: theme.zIndex.drawer,
      [theme.breakpoints.down('md')]: {
        width: 240,
        transform: collapsed ? 'translateX(-100%)' : 'translateX(0)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: theme.zIndex.drawer + 1,
      },
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
        maxWidth: 280,
        transform: collapsed ? 'translateX(-100%)' : 'translateX(0)',
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.15)',
      },
    },
    // Mobile specific styles
    [theme.breakpoints.down('sm')]: {
      '&.MuiDrawer-root': {
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  }),
);

export const StyledLogoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
}));

export const StyledMenuSection = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

export const StyledList = styled(List)(({ theme }) => ({
  '& .MuiListItemButton-root': {
    borderRadius: 8,
    margin: `0 ${theme.spacing(1)}`,
    marginBottom: theme.spacing(0.5),
  },
})) as typeof List;

export const StyledGroupLabel = styled(Typography)(({ theme }) => ({
  padding: `${theme.spacing(0.75)} ${theme.spacing(1.5)}`,
  color: theme.palette.text.secondary,
  fontWeight: 600,
  display: 'block',
  fontSize: '0.875rem',
}));

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 8,
  margin: `0 ${theme.spacing(1)}`,
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    color: '#000000',
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export const StyledSubMenuItemButton = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  borderRadius: 8,
  margin: `0 ${theme.spacing(1)}`,
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    color: '#000000',
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));
