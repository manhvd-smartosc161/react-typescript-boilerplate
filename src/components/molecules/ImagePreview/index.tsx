import React from 'react';
import { Box, Typography } from '@mui/material';

interface ImagePreviewProps {
  label: string;
  file: File | string | null | undefined;
}

// TODO: Need Refactor
const ImagePreview: React.FC<ImagePreviewProps> = ({ label, file }) => {
  const src = React.useMemo(() => {
    if (!file) return null;
    return typeof file === 'string' ? file : URL.createObjectURL(file);
  }, [file]);

  React.useEffect(() => {
    // Cleanup function to revoke the object URL and prevent memory leaks
    return () => {
      if (src && typeof file !== 'string') {
        URL.revokeObjectURL(src);
      }
    };
  }, [src, file]);

  return (
    <Box textAlign="center">
      {src ? (
        <img
          src={src}
          alt={label}
          style={{
            width: '100%',
            height: '120px',
            objectFit: 'contain',
            borderRadius: '4px',
            border: '1px solid #eee',
          }}
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '120px',
            bgcolor: 'grey.100',
            borderRadius: '4px',
            border: '1px solid #eee',
          }}
        />
      )}
      <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
        {label}
      </Typography>
    </Box>
  );
};

export default ImagePreview;
