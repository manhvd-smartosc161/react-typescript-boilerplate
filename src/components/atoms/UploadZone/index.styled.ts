import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

interface StyledUploadZoneProps {
  $isDragOver?: boolean;
  $disabled?: boolean;
  $variant?: 'default' | 'compact';
}

export const StyledUploadZone = styled(Box)<StyledUploadZoneProps>(
  ({
    theme,
    $isDragOver = false,
    $disabled = false,
    $variant = 'default',
  }) => ({
    position: 'relative',
    border: `2px dashed ${$isDragOver ? theme.palette.primary.main : theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: $isDragOver
      ? theme.palette.primary.light + '20'
      : theme.palette.grey[50],
    padding: $variant === 'compact' ? theme.spacing(2) : theme.spacing(4),
    textAlign: 'center',
    transition: theme.transitions.create(['border-color', 'background-color'], {
      duration: theme.transitions.duration.short,
    }),
    opacity: $disabled ? 0.5 : 1,
    cursor: $disabled ? 'not-allowed' : 'pointer',
    minHeight: $variant === 'compact' ? 80 : 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      borderColor: $disabled
        ? theme.palette.grey[300]
        : theme.palette.primary.main,
      backgroundColor: $disabled
        ? theme.palette.grey[50]
        : theme.palette.primary.light + '10',
    },
  }),
);
