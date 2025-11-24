import React from 'react';
// import { Typography } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DropzoneProps } from 'react-dropzone';
import { ButtonAtom } from '@src/components/atoms';
import { StyledDropzone, StyledUploadWrapper } from './index.styled';
import { ManagedFile } from '../FilePreviewItem';
import { useTranslation } from 'react-i18next';

interface UploadDropzoneProps extends Pick<DropzoneProps, 'onDrop'> {
  getRootProps: () => any;
  getInputProps: () => any;
  isDragActive: boolean;
  hasError?: boolean;
  open: () => void;
  files: ManagedFile[];
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  getRootProps,
  getInputProps,
  isDragActive,
  hasError,
  open,
  files,
}) => {
  const { t } = useTranslation();
  return (
    <StyledUploadWrapper direction="row" spacing={2} alignItems="flex-start">
      <StyledDropzone
        {...getRootProps()}
        variant="outlined"
        isDragActive={isDragActive}
        hasError={hasError}
      >
        <input {...getInputProps()} style={{ display: 'none' }} />
        {/* <CloudUploadIcon sx={{ fontSize: 48, color: 'grey.500' }} /> */}
        {files?.map((file) => (
          <div key={file.id} style={{ marginBottom: 12 }}>
            <b>{file.name}</b>

            <div
              style={{
                height: 6,
                width: '100%',
                background: '#eee',
                borderRadius: 4,
                overflow: 'hidden',
                marginTop: 4,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${file.progress}%`,
                  transition: '0.2s',
                  background: file.status === 'success' ? '#4caf50' : '#1976d2',
                }}
              />
            </div>

            <div style={{ fontSize: 12, marginTop: 2 }}>
              {file.status === 'uploading' && `${file.progress}%`}
              {file.status === 'success' && t('common:done')}
            </div>
          </div>
        ))}
        <ButtonAtom
          variant="secondary"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            open();
          }}
        >
          Browse Files
        </ButtonAtom>
        {/* <Typography>
          Drag & drop files here, or click to select files
        </Typography> */}
      </StyledDropzone>
    </StyledUploadWrapper>
  );
};
