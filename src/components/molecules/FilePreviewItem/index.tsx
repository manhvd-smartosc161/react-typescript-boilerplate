import * as React from 'react';
import {
  Box,
  IconButton,
  LinearProgress,
  Link,
  Typography,
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as CheckIcon,
  ErrorOutline as ErrorIcon,
} from '@mui/icons-material';
import {
  FileItemRoot,
  HeaderRow,
  NameAndStatus,
  StatusRow,
  ActionsRow,
} from './index.styled';
import { IconAtom } from '@src/components/atoms';

export type FileStatus = 'uploading' | 'success' | 'error';
export interface ManagedFile {
  id: string;
  file?: File;
  name: string;
  url?: string;
  status: FileStatus;
  progress: number; // 0-100
  error?: string;
}

interface FilePreviewItemProps {
  file: ManagedFile;
  onRemove: () => void;
  onView?: () => void;
  onChange?: () => void;
}

const pickIcon = (name = '') => {
  const ext = name.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') return <IconAtom name="pdfFile" size={50} />;
  if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'webp')
    return <IconAtom name="imageFile" size={50} />;
  if (ext === 'xlsx' || ext === 'xls' || ext === 'csv')
    return <IconAtom name="excelFile" size={50} />;
  return <></>;
};

const StatusBadge: React.FC<{ status: FileStatus; text?: string }> = ({
  status,
  text,
}) => {
  if (status === 'success') {
    return (
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
        <CheckIcon fontSize="small" color="primary" />
        <Typography variant="body2" color="secondary">
          Uploaded
        </Typography>
      </Box>
    );
  }
  if (status === 'error') {
    return (
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
        <ErrorIcon fontSize="small" color="error" />
        <Typography variant="body2" color="error.main">
          {text || 'Failed'}
        </Typography>
      </Box>
    );
  }
  return (
    <Typography variant="body2" color="text.secondary">
      Uploading... {text}
    </Typography>
  );
};

const FilePreviewItem: React.FC<FilePreviewItemProps> = ({
  file,
  onRemove,
  onView,
  onChange,
}) => {
  return (
    <FileItemRoot elevation={1}>
      <div aria-hidden>{pickIcon(file.name)}</div>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <HeaderRow>
          <NameAndStatus>
            <Typography variant="subtitle2" noWrap title={file.name}>
              {file.name}
            </Typography>
            <StatusRow>
              <StatusBadge
                status={file.status}
                text={
                  file.status === 'uploading'
                    ? `${Math.round(file.progress)}%`
                    : file.status === 'error'
                      ? file.error
                      : undefined
                }
              />
            </StatusRow>
          </NameAndStatus>

          <IconButton aria-label="remove file" size="small" onClick={onRemove}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </HeaderRow>

        <ActionsRow>
          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={onView}
            sx={{ mr: 1, textDecoration: 'none' }}
          >
            View
          </Link>
          <Typography variant="body2" sx={{ mx: 1 }} color="text.disabled">
            |
          </Typography>
          <Link
            component="button"
            type="button"
            variant="body2"
            onClick={onChange}
            sx={{ textDecoration: 'none' }}
          >
            Change File
          </Link>
        </ActionsRow>

        {file.status === 'uploading' && (
          <Box sx={{ mt: 1 }}>
            <LinearProgress variant="determinate" value={file.progress} />
          </Box>
        )}
      </Box>
    </FileItemRoot>
  );
};

export default FilePreviewItem;
