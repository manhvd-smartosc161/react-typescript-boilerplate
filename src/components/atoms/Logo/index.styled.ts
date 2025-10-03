import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

interface StyledLogoProps {
  $width?: number | string;
  $height?: number | string;
  $clickable?: boolean;
}

export const StyledLogo = styled(Box)<StyledLogoProps>(
  ({ $width = 120, $height = 40, $clickable = false }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: $width,
    height: $height,
    cursor: $clickable ? 'pointer' : 'default',
    transition: 'opacity 0.2s ease',
    '&:hover': {
      opacity: $clickable ? 0.8 : 1,
    },
    '& img': {
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
);
