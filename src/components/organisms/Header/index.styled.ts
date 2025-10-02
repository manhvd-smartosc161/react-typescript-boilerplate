import { styled } from '@mui/material/styles';
import { AppBar, Box, Stack, Avatar, Menu } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
}));

export const StyledHeaderContent = styled(Box)(() => ({
  flex: 1,
}));

export const StyledUserProfileSection = styled(Stack)(() => ({
  cursor: 'pointer',
  padding: '8px 16px',
  borderRadius: '12px',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

export const StyledUserInfo = styled(Box)(() => ({
  textAlign: 'right',
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  border: '2px solid',
  borderColor: theme.palette.primary.main,
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
