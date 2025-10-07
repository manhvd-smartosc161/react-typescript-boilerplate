import React from 'react';
import { CircularProgress } from '@mui/material';
import {
  DescriptionOutlined as FileIcon,
  Cancel as CancelIcon,
  ErrorOutline as ErrorIcon,
} from '@mui/icons-material';
import {
  FilePreviewContainer,
  RemoveButton,
  UploadOverlay,
} from './index.styled';

export type FileStatus = 'uploading' | 'success' | 'error';
export interface ManagedFile {
  id: string;
  file?: File;
  name: string;
  url?: string;
  status: FileStatus;
  progress: number;
  error?: string;
}

interface FilePreviewItemProps {
  file: ManagedFile;
  onRemove: () => void;
}

const FilePreviewItem: React.FC<FilePreviewItemProps> = ({
  file,
  onRemove,
}) => {
  return (
    <FilePreviewContainer variant="outlined" status={file.status}>
      <RemoveButton size="small" onClick={onRemove}>
        <CancelIcon fontSize="small" />
      </RemoveButton>

      {file.status === 'uploading' && (
        <UploadOverlay>
          <CircularProgress
            variant="determinate"
            value={file.progress}
            size={40}
          />
        </UploadOverlay>
      )}

      {file.status === 'error' && <ErrorIcon color="error" fontSize="large" />}

      {file.status === 'success' && (
        <FileIcon color="action" sx={{ fontSize: 40 }} />
      )}
    </FilePreviewContainer>
  );
};

export default FilePreviewItem;
