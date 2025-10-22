import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Button } from '@mui/material';

export const StyledSettingsContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
    boxShadow: 'none',
    border: '1px solid #e0e0e0',
  },
}));

export const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  },
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: '1.5rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.25rem',
  },
}));

export const StyledSaveButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5, 1),
    fontSize: '0.75rem',
    minHeight: '32px',
  },
}));

export const StyledSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));

export const StyledSectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.125rem',
    marginBottom: theme.spacing(0.5),
  },
}));

export const StyledSectionDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    marginBottom: theme.spacing(1.5),
  },
}));

export const StyledFormRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
}));

export const StyledFormField = styled(Box)(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.down('sm')]: {
    flex: 'none',
  },
}));

export const StyledAvatarSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
}));

export const StyledAvatarContainer = styled(Box)(() => ({
  position: 'relative',
  display: 'inline-block',
}));

export const StyledAvatarActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(0.5),
  },
}));

export const StyledBanner = styled(Box)<{ $type: 'success' | 'error' | null }>(
  ({ theme, $type }) => ({
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    backgroundColor:
      $type === 'success'
        ? theme.palette.success.light
        : $type === 'error'
          ? theme.palette.error.light
          : 'transparent',
    color:
      $type === 'success'
        ? theme.palette.success.dark
        : $type === 'error'
          ? theme.palette.error.dark
          : 'transparent',
    fontSize: '0.875rem',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0.75),
      fontSize: '0.8rem',
    },
  }),
);
