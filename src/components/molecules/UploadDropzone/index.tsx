import React from 'react';
import { Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DropzoneProps } from 'react-dropzone';
import { ButtonAtom } from '@src/components/atoms';
import { StyledDropzone, StyledUploadWrapper } from './index.styled';

interface UploadDropzoneProps extends Pick<DropzoneProps, 'onDrop'> {
  getRootProps: () => any;
  getInputProps: () => any;
  isDragActive: boolean;
  hasError?: boolean;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  getRootProps,
  getInputProps,
  isDragActive,
  hasError,
}) => {
  return (
    <StyledUploadWrapper direction="row" spacing={2} alignItems="flex-start">
      <StyledDropzone
        {...getRootProps()}
        variant="outlined"
        isDragActive={isDragActive}
        hasError={hasError}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 48, color: 'grey.500' }} />
        <Typography>
          Drag & drop files here, or click to select files
        </Typography>
      </StyledDropzone>
      <ButtonAtom
        variant="secondary"
        onClick={(e) => getRootProps().onClick?.(e)}
      >
        Browse Files
      </ButtonAtom>
    </StyledUploadWrapper>
  );
};
