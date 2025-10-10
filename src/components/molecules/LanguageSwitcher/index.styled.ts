import { styled } from '@mui/material/styles';
import { Box, Button, Menu, MenuItem } from '@mui/material';

export const StyledLanguageSwitcherWrapper = styled(Box)(() => ({}));

export const StyledLanguageButton = styled(Button)(() => ({
  color: '#333',
  textTransform: 'none',
  padding: '4px 4px',
  minWidth: 'auto',
  '& .MuiButton-endIcon': {
    marginLeft: '2px',
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '&:disabled': {
    opacity: 0.6,
  },
}));

export const StyledLanguageMenu = styled(Menu)(() => ({
  '& .MuiPaper-root': {
    marginTop: '12px',
    minWidth: 120,
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
}));

export const StyledLanguageMenuItem = styled(MenuItem)<{ isPending?: boolean }>(
  ({ isPending }) => ({
    padding: '12px 16px',
    opacity: isPending ? 0.6 : 1,
  }),
);
