import { styled } from '@mui/material/styles';
import { Stack, Paper } from '@mui/material';

export const StyledUploadWrapper = styled(Stack)({
  position: 'relative',
});

export const StyledDropzone = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isDragActive' && prop !== 'hasError',
})<{ isDragActive?: boolean; hasError?: boolean }>(
  ({ theme, isDragActive, hasError }) => ({
    padding: '80px !important',
    textAlign: 'center',
    cursor: 'pointer',
    flexGrow: 1,
    backgroundColor: isDragActive ? '#D9D9D9 !important' : '#D9D9D9',
    borderStyle: 'dashed',
    borderColor: hasError ? theme.palette.error.main : theme.palette.grey[500],
    borderRadius: '10px !important',
  }),
);
