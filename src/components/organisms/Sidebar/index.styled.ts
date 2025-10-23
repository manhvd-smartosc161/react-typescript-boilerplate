import { styled } from '@mui/material/styles';
import { Drawer, Box, Typography, ListItemButton, List, IconButton } from '@mui/material';

interface StyledDrawerProps {
  collapsed?: boolean;
}

export const StyledDrawer = styled(Drawer)<StyledDrawerProps>(
  ({ collapsed = false, theme }) => ({
    width: collapsed ? 72 : 260,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: collapsed ? 72 : 260,
      height: '100vh',
      boxSizing: 'border-box',
      borderRight: 'none',
      transition: 'width 0.2s',
      boxShadow: '0px 6px 24px rgba(0,0,0,0.10), 0px 0px 4px rgba(0,0,0,0.08)',
      position: 'fixed',
      top: 67,
      left: 0,
      [theme.breakpoints.down('md')]: {
        width: 260,
        transform: collapsed ? 'translateX(-100%)' : 'translateX(0)',
        transition: 'transform 0.3s ease-in-out',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
        maxWidth: 260,
        transform: collapsed ? 'translateX(-100%)' : 'translateX(0)',
        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.15)',
        top: 0,
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


interface StyledMenuSectionProps {
  collapsed?: boolean;
}

export const StyledMenuSection = styled(Box)<StyledMenuSectionProps>(({ collapsed = false, theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: `${collapsed} ? ${theme.spacing(1)} ${theme.spacing(2)}: ${theme.spacing(1)} ${theme.spacing(1)}`,
}));

export const StyledList = styled(List)(({ theme }) => ({
  '& .MuiListItemButton-root': {
    borderRadius: 8,
    margin: `0 ${theme.spacing(1)}`,
    marginBottom: theme.spacing(1),
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
  margin: `0 ${theme.spacing(1)} !important`,
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    color: '#000000',
  },
  '&.Mui-selected': {
    backgroundColor: '#EDEDED',
    color: '#424242',
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

export const StyledToggleBtn = styled(IconButton, {
  shouldForwardProp: (p) => p !== 'collapsed',
})<{ collapsed: boolean }>(({ theme, collapsed }) => ({
  position: 'fixed',
  top: '50%',
  transform: 'translateY(-50%)',
  left: (collapsed ? 72 : 260),
  width: 18,
  height: 48,
  borderRadius: '0 8px 8px 0',
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  zIndex: theme.zIndex.drawer + 1,
  '&:hover':
  {
    boxShadow: theme.shadows[4],
    background: theme.palette.background.paper
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));