import { styled } from '@mui/material/styles';
import { AppBar, Box, Stack, Avatar, Menu } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  [theme.breakpoints.down('sm')]: {
    height: 56,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
}));

export const StyledHeaderContent = styled(Box)(() => ({
  flex: 1,
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
