import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledFlag = styled(Box)<{ size: number }>(({ size }) => ({
  fontSize: `${size}px`,
  lineHeight: 1,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
