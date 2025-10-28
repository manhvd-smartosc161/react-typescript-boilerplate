import { styled } from '@mui/material/styles';
import { Stack, Box } from '@mui/material';

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

export const StyledUploadZone = styled(Stack)(({ theme }) => ({
  cursor: 'pointer',
  display: 'inline-flex',
  marginTop: theme.spacing(2),
}));

export const StyledUploadIcon = styled(Box)(({ theme }) => ({
  width: 255,
  height: 160,
  borderRadius: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0px 6px 24px rgba(0, 0, 0, 0.10), 0px 0px 4px rgba(0, 0, 0, 0.08)`,
  [theme.breakpoints.down('sm')]: {
    width: 150,
  },
}));
