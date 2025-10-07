import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  AddPhotoAlternate as PlaceholderIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

interface SingleImageUploaderProps {
  name: string;
  label: string;
  required?: boolean;
}

const SingleImageUploader: React.FC<SingleImageUploaderProps> = ({
  name,
  label,
  required,
}) => {
  const { control } = useFormContext();
  const [isUploading, setIsUploading] = React.useState(false); // Simplified local state

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const onDrop = (acceptedFiles: File[]) => {
          if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setIsUploading(true);
            // Simulate upload
            setTimeout(() => {
              onChange(file); // In a real app, you'd upload, get a URL, and call onChange(url)
              setIsUploading(false);
            }, 1000);
          }
        };

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop,
          accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
          multiple: false,
        });

        return (
          <Box textAlign="center">
            <Paper
              {...getRootProps()}
              variant="outlined"
              sx={{
                width: '100%',
                aspectRatio: '1 / 1', // Enforce square shape
                p: 1,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                cursor: 'pointer',
                borderColor: error
                  ? 'error.main'
                  : isDragActive
                    ? 'primary.main'
                    : 'grey.400',
                borderStyle: 'dashed',
              }}
            >
              <input {...getInputProps()} />

              {isUploading ? (
                <CircularProgress />
              ) : value ? (
                <>
                  <img
                    src={
                      typeof value === 'string'
                        ? value
                        : URL.createObjectURL(value)
                    }
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                    onLoad={(e) => {
                      if (typeof value !== 'string') {
                        URL.revokeObjectURL(e.currentTarget.src);
                      }
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(null);
                    }}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    <CancelIcon fontSize="small" />
                  </IconButton>
                </>
              ) : (
                <PlaceholderIcon sx={{ fontSize: 40, color: 'grey.500' }} />
              )}
            </Paper>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              {label} {required && '*'}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              png or jpeg file size not exceeding 3MB
            </Typography>
          </Box>
        );
      }}
    />
  );
};

export default SingleImageUploader;
