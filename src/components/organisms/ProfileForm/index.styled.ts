import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';
import { ButtonAtom, AvatarAtom, LabelAtom } from '@src/components/atoms';

export const StyledProfileForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.25),
    gap: theme.spacing(1),
  },
})) as typeof Box;

export const DeleteButton = styled(Button)(() => ({
  position: 'absolute',
  top: -8,
  right: -8,
  minWidth: 'auto',
  width: 24,
  height: 24,
  borderRadius: '50%',
  backgroundColor: 'rgba(255,255,255,0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
}));

export const AvatarContainer = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  overflow: 'hidden',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    width: 40,
    height: 40,
  },
}));

export const AvatarImage = styled('img')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}));

export const ChangeAvatarButton = styled(ButtonAtom)(({ theme }) => ({
  textTransform: 'capitalize',
  borderColor: '#d1d5db',
  color: '#374151',
  backgroundColor: '#fff',
  '&:hover': {
    borderColor: '#9ca3af',
    backgroundColor: '#f9fafb',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5, 1),
    fontSize: '0.75rem',
    minHeight: '28px',
  },
}));

export const DefaultAvatar = styled(AvatarAtom)(({ theme }) => ({
  width: 48,
  height: 48,
  backgroundColor: '#ececfd',
  color: '#4b43ea',
  [theme.breakpoints.down('sm')]: {
    width: 40,
    height: 40,
  },
}));

export const ProfileSubtitle = styled(Typography)(() => ({
  color: '#94a2b8',
}));

export const ProfileTitle = styled(LabelAtom)(() => ({
  fontSize: '18px',
  fontWeight: 'bold',
}));
