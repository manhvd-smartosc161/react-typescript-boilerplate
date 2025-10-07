import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledLogoContainer = styled(Box)<{ collapsed?: boolean }>(
  ({ collapsed = false }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: collapsed ? '0' : '12px',
    padding: collapsed ? '8px' : '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    minWidth: collapsed ? 'auto' : '200px',
    justifyContent: collapsed ? 'center' : 'flex-start',
  }),
);

export const StyledLogoIcon = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
}));

export const StyledIconContainer = styled(Box)(() => ({
  position: 'relative',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledChevron = styled(Box)(() => ({
  position: 'absolute',
  left: '0',
  width: '0',
  height: '0',
  borderTop: '12px solid transparent',
  borderBottom: '12px solid transparent',
  borderLeft: '20px solid #FFD700',
  borderRadius: '2px',
}));

export const StyledBlueShape1 = styled(Box)(() => ({
  position: 'absolute',
  right: '0',
  width: '8px',
  height: '12px',
  backgroundColor: '#1E90FF',
  borderRadius: '2px',
  transform: 'rotate(45deg)',
  top: '4px',
}));

export const StyledBlueShape2 = styled(Box)(() => ({
  position: 'absolute',
  right: '0',
  width: '8px',
  height: '12px',
  backgroundColor: '#1E90FF',
  borderRadius: '2px',
  transform: 'rotate(-45deg)',
  bottom: '4px',
}));

export const StyledLogoText = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));
