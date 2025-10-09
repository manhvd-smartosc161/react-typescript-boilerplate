import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';
import { ButtonAtom, AvatarAtom, LabelAtom } from '@src/components/atoms';

export const StyledProfileForm = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
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

export const AvatarContainer = styled(Box)(() => ({
  width: 56,
  height: 56,
  borderRadius: '50%',
  overflow: 'hidden',
  position: 'relative',
}));

export const AvatarImage = styled('img')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}));

export const ChangeAvatarButton = styled(ButtonAtom)(() => ({
  textTransform: 'capitalize',
  borderColor: '#d1d5db',
  color: '#374151',
  backgroundColor: '#fff',
  '&:hover': {
    borderColor: '#9ca3af',
    backgroundColor: '#f9fafb',
  },
}));

export const DefaultAvatar = styled(AvatarAtom)(() => ({
  width: 56,
  height: 56,
  backgroundColor: '#ececfd',
  color: '#4b43ea',
}));

export const ProfileSubtitle = styled(Typography)(() => ({
  color: '#94a2b8',
}));

export const ProfileTitle = styled(LabelAtom)(() => ({
  fontSize: 28,
  fontWeight: 'bold',
}));
