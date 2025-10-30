import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledMainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  flexDirection: 'column',
  backgroundColor: '#FFFFFF',
  [theme.breakpoints.down('sm')]: {
    height: '100vh',
    overflow: 'hidden',
    flexDirection: 'column',
  },
}));

export const StyledMainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: '#FFFFFF',
  height: 'calc(100vh - 64px)',
  overflow: 'auto',
  display: 'flex',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    height: '100vh',
  },
  [theme.breakpoints.down('sm')]: {
    height: 'calc(100vh - 56px)',
    width: '100%',
    overflow: 'auto',
    flex: 1,
    marginLeft: 0,
  },
})) as typeof Box;

export const StyledContentArea = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  maxWidth: '100%',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    overflow: 'auto',
    height: '100%',
    paddingBottom: theme.spacing(2),
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
  },
}));
