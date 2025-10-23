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

  padding: 15,
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
    height: 393,
    background: `url('/images/auth-background.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.down('sm')]: {
      height: 293,
    },
  },
}));

export const StyledAuthCard = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 450,
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 1)',
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
  zIndex: 20,
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  boxShadow: '0px 0px 30px 0px #0000000D',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(2),
  },
}));

export const StyledLogoImage = styled('img')(({ theme }) => ({
  maxWidth: '150px',
  height: 'auto',
  marginTop: theme.spacing(8),
}));

export const StyledLogoFooter = styled('p')(() => ({
  margin: 0,
  fontSize: '0.75rem',
  color: '#999',
}));

export const StyledBrandLogo = styled('img')(() => ({
  position: 'absolute',
  height: 'auto',
  zIndex: 1,
  left: '50%',
  top: 100,
  transform: 'translate(-50%, -50%)',
}));
