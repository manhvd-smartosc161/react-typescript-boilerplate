import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledMainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  flexDirection: 'column',
  backgroundColor: '#FFFFFF',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

export const StyledMainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: '#FFFFFF',
  height: 'calc(100vh - 64px)',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    height: '100vh',
    width: 'auto',
  },
})) as typeof Box;

export const StyledContentArea = styled(Box)(() => ({
  flexGrow: 1,
  overflow: 'auto',
  maxWidth: '100%',
}));
