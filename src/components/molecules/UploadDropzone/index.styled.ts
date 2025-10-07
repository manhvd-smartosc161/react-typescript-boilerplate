import { styled, alpha } from '@mui/material/styles';
import { Stack, Paper } from '@mui/material';

export const StyledUploadWrapper = styled(Stack)({
  position: 'relative',
});

export const StyledDropzone = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isDragActive' && prop !== 'hasError',
})<{ isDragActive?: boolean; hasError?: boolean }>(
  ({ theme, isDragActive, hasError }) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    cursor: 'pointer',
    flexGrow: 1,
    backgroundColor: isDragActive
      ? alpha(theme.palette.primary.light, 0.1)
      : '#fafafa',
    borderStyle: 'dashed',
    borderColor: hasError ? theme.palette.error.main : theme.palette.grey[500],
  }),
);
