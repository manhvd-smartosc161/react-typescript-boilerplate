import { useCallback } from 'react';
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';
import { Typography, Box } from '@mui/material';
import { UploadZoneAtom } from '@src/components/atoms';

export interface ControlledFileUploadFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  variant?: 'default' | 'compact';
  onFileSelect?: (file: File | null) => void;
  onFilesSelect?: (files: FileList | null) => void;
  preview?: boolean;
  showFileInfo?: boolean;
}

const ControlledFileUploadField = <
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  control,
  label,
  helperText,
  required = false,
  disabled = false,
  multiple = false,
  accept = '*',
  maxSize = 10,
  variant = 'default',
  onFileSelect,
  onFilesSelect,
  showFileInfo = true,
  ...uploadProps
}: ControlledFileUploadFieldProps<TFieldValues>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleFileSelect = useCallback(
    (file: File | null) => {
      onChange(file);
      onFileSelect?.(file);
    },
    [onChange, onFileSelect],
  );

  const handleFilesSelect = useCallback(
    (files: FileList | null) => {
      if (multiple && files) {
        onChange(Array.from(files));
      } else if (files && files.length > 0) {
        onChange(files[0]);
      } else {
        onChange(null);
      }
      onFilesSelect?.(files);
    },
    [onChange, onFilesSelect, multiple],
  );

  const getFileInfo = () => {
    if (!value) return null;

    if (Array.isArray(value)) {
      return `${value.length} files selected`;
    }

    if (
      value &&
      typeof value === 'object' &&
      'name' in value &&
      'size' in value
    ) {
      const file = value as File;
      return `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
    }

    return 'File selected';
  };

  return (
    <Box>
      {label && (
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
          {label}
          {required && <span style={{ color: '#ff4d4f' }}> *</span>}
        </Typography>
      )}

      <Controller
        name={name}
        control={control}
        render={() => (
          <UploadZoneAtom
            {...uploadProps}
            onFileSelect={handleFileSelect}
            onFilesSelect={handleFilesSelect}
            accept={accept}
            multiple={multiple}
            maxSize={maxSize}
            disabled={disabled}
            variant={variant}
          />
        )}
      />

      {showFileInfo && value && (
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          {getFileInfo()}
        </Typography>
      )}

      {error && (
        <Typography variant="body2" sx={{ mt: 1, color: 'error.main' }}>
          {error.message}
        </Typography>
      )}

      {helperText && !error && (
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default ControlledFileUploadField;
