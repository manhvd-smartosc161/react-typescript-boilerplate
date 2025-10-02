import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledAuthWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: theme.spacing(2.5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.25),
  },
}));

export const StyledAuthCard = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 450,
  padding: theme.spacing(6),
  background: 'white',
  borderRadius: theme.spacing(2),
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1.5),
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(2),
  },
}));

export const StyledLogo = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(5),
}));

export const StyledLogoTitle = styled('h2')(() => ({
  margin: 0,
  fontSize: '2rem',
  fontWeight: 'bold',
}));

export const StyledLogoSubtitle = styled('p')(() => ({
  margin: '8px 0 0 0',
  color: '#666',
  fontSize: '0.9rem',
}));

export const StyledLogoFooter = styled('p')(() => ({
  margin: 0,
  fontSize: '0.75rem',
  color: '#999',
}));
