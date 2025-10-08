import { styled } from '@mui/material/styles';
import { Stack, Box, Paper } from '@mui/material';

interface StyledDropZoneProps {
  $isDragActive: boolean;
}

export const StyledDropZone = styled(Box)<StyledDropZoneProps>(
  ({ theme, $isDragActive }) => ({
    border: $isDragActive ? '2px dashed' : 'none',
    borderColor: $isDragActive ? theme.palette.primary.main : 'transparent',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    transition: 'all 0.2s ease',
    backgroundColor: $isDragActive ? theme.palette.action.hover : 'transparent',
  }),
);

export const StyledFileStack = styled(Stack)({
  position: 'relative',
});

export const StyledUploadZone = styled(Stack)({
  cursor: 'pointer',
  display: 'inline-flex',
});

export const StyledUploadIcon = styled(Paper)(({ theme }) => ({
  width: 80,
  height: 80,
  borderStyle: 'dashed',
  borderColor: theme.palette.grey[400],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
