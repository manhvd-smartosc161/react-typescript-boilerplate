import { styled } from '@mui/material/styles';
import { Stack, Box, Paper } from '@mui/material';

interface StyledDropZoneProps {
  isDragActive: boolean;
}

export const StyledDropZone = styled(Box)<StyledDropZoneProps>(
  ({ theme, isDragActive }) => ({
    border: isDragActive ? '2px dashed' : 'none',
    borderColor: isDragActive ? theme.palette.primary.main : 'transparent',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5),
    transition: 'all 0.2s ease',
    backgroundColor: isDragActive ? theme.palette.action.hover : 'transparent',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
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
  width: 60,
  height: 60,
  borderStyle: 'dashed',
  borderColor: theme.palette.grey[400],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    width: 50,
    height: 50,
  },
}));
