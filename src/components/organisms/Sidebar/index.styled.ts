import { styled } from '@mui/material/styles';
import { Drawer, Box, Typography, ListItemButton, List } from '@mui/material';

interface StyledDrawerProps {
  $collapsed?: boolean;
}

export const StyledDrawer = styled(Drawer)<StyledDrawerProps>(
  ({ $collapsed = false }) => ({
    width: $collapsed ? 80 : 280,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: $collapsed ? 80 : 280,
      height: '100vh',
      boxSizing: 'border-box',
      borderRight: 'none',
      transition: 'width 0.2s',
      boxShadow: '2px 0 8px rgba(0, 0, 0, 0.05)',
      position: 'fixed',
      top: 0,
      left: 0,
    },
  }),
);

export const StyledLogoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 15px',
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
}));

export const StyledMenuSection = styled(Box)(() => ({
  flex: 1,
  overflowY: 'auto',
  paddingTop: 8,
  paddingBottom: 8,
}));

export const StyledList = styled(List)(() => ({
  '& .MuiListItemButton-root': {
    borderRadius: 8,
    margin: '0 8px',
    marginBottom: 4,
  },
})) as typeof List;

export const StyledGroupLabel = styled(Typography)(({ theme }) => ({
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  color: theme.palette.text.secondary,
  fontWeight: 600,
  display: 'block',
}));

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 8,
  margin: '0 8px',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export const StyledSubMenuItemButton = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  borderRadius: 8,
  margin: '0 8px',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export const StyledUserSection = styled(Box)(({ theme }) => ({
  borderTop: '1px solid',
  borderColor: theme.palette.divider,
}));

export const StyledExportSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));
