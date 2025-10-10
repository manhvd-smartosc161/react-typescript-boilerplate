import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledLanguageSwitcherWrapper = styled(Box)(() => ({}));

export const StyledLanguageToggle = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const StyledLanguageOption = styled(Box)<{ isActive: boolean }>(
  ({ isActive }) => ({
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    color: isActive ? '#333' : '#999',
    fontWeight: isActive ? 600 : 400,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  }),
);
