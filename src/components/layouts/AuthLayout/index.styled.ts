import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledAuthWrapper = styled(Box)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5px',

  padding: 0,
  margin: 0,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  '&::before': {
    content: '""',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '50vh',
    background: `url('/images/auth-background.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

export const StyledAuthCard = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 450,
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 1)',
  borderRadius: theme.spacing(3),
  border: '2px solid #b39ddb',
  position: 'relative',
  zIndex: 20,
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(2),
  },
}));

export const StyledLogoImage = styled('img')(() => ({
  maxWidth: '150px',
  height: 'auto',
}));

export const StyledLogoFooter = styled('p')(() => ({
  margin: 0,
  fontSize: '0.75rem',
  color: '#999',
}));
