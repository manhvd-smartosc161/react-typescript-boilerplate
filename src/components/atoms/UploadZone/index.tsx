import { FC, ReactNode, useCallback, useState } from 'react';
import { Box, Typography, SxProps, Theme } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { StyledUploadZone } from './index.styled';

export interface UploadZoneProps {
  onFileSelect?: (file: File | null) => void;
  onFilesSelect?: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
  variant?: 'default' | 'compact';
}

const UploadZoneAtom: FC<UploadZoneProps> = ({
  onFileSelect,
  onFilesSelect,
  accept = '*',
  multiple = false,
  maxSize = 10,
  disabled = false,
  children,
  className,
  sx,
  variant = 'default',
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>('');

  const validateFile = useCallback(
    (file: File) => {
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        setError(`File size must be less than ${maxSize}MB`);
        return false;
      }
      setError('');
      return true;
    },
    [maxSize],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (validateFile(file)) {
          if (multiple) {
            onFilesSelect?.(files);
          } else {
            onFileSelect?.(file);
          }
        }
      }
    },
    [disabled, validateFile, multiple, onFileSelect, onFilesSelect],
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (validateFile(file)) {
          if (multiple) {
            onFilesSelect?.(files);
          } else {
            onFileSelect?.(file);
          }
        }
      }
      // Reset input value to allow selecting the same file again
      e.target.value = '';
    },
    [validateFile, multiple, onFileSelect, onFilesSelect],
  );

  return (
    <StyledUploadZone
      className={className}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      $isDragOver={isDragOver}
      $disabled={disabled}
      $variant={variant}
      sx={sx}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        disabled={disabled}
        style={{ display: 'none' }}
        id="file-upload"
      />

      {children || (
        <Box textAlign="center">
          <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Drop files here or click to upload
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {multiple ? 'Multiple files supported' : 'Single file upload'}
            {maxSize && ` • Max size: ${maxSize}MB`}
          </Typography>
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Box>
      )}

      <label
        htmlFor="file-upload"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      />
    </StyledUploadZone>
  );
};

export default UploadZoneAtom;
