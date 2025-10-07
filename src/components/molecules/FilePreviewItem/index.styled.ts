import { styled, Paper, IconButton, Box } from '@mui/material';

export const FilePreviewContainer = styled(Paper)<{
  status: 'uploading' | 'success' | 'error';
}>(({ status }) => ({
  width: 80,
  height: 80,
  padding: 8,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: status === 'error' ? 'error.main' : undefined,
}));

export const RemoveButton = styled(IconButton)({
  position: 'absolute',
  top: -8,
  right: -8,
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'grey.200',
  },
});

export const UploadOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  borderRadius: 4,
});
