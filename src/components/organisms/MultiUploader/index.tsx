import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useFormContext, FieldPath } from 'react-hook-form';
import { Box, FormHelperText } from '@mui/material';
import FilePreviewItem, {
  ManagedFile,
} from '@src/components/molecules/FilePreviewItem';
import { ButtonAtom } from '@src/components/atoms';
import { UploadFileOutlined } from '@mui/icons-material';
import {
  StyledDropZone,
  StyledFileStack,
  StyledUploadZone,
  StyledUploadIcon,
} from './index.styled';

// TODO: Need Refactor
const uploadFile = (
  file: File,
  onProgress: (percent: number) => void,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      onProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        if (file.name.includes('fail')) {
          reject('Simulated upload failure!');
        } else {
          resolve(`https://fake-server.com/uploads/${Date.now()}-${file.name}`);
        }
      }
    }, 400);
  });
};

interface MultiUploaderProps {
  name: FieldPath<any>;
  label: string;
}

// TODO: Need Refactor and optimize this component
const MultiUploader: React.FC<MultiUploaderProps> = ({ name }) => {
  const { control } = useFormContext();
  const [managedFiles, setManagedFiles] = useState<ManagedFile[]>([]);

  const renderUploadZone = (openFileDialog: () => void) => {
    return (
      <StyledUploadZone
        direction="row"
        spacing={1.5}
        alignItems="center"
        onClick={openFileDialog}
      >
        {managedFiles?.length === 0 && (
          <StyledUploadIcon variant="outlined">
            <UploadFileOutlined />
          </StyledUploadIcon>
        )}
        <ButtonAtom variant="text">+ Add</ButtonAtom>
      </StyledUploadZone>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({
        field: { onChange, value: rhfValue },
        fieldState: { error },
      }) => {
        const onDrop = useCallback(
          (acceptedFiles: File[]) => {
            const newFiles: ManagedFile[] = acceptedFiles.map((file) => ({
              id: `${file.name}-${file.lastModified}`,
              file,
              name: file.name,
              status: 'uploading',
              progress: 0,
            }));
            setManagedFiles((prev) => [...prev, ...newFiles]);

            newFiles.forEach((managedFile) => {
              uploadFile(managedFile.file!, (progress) => {
                setManagedFiles((prev) =>
                  prev.map((mf) =>
                    mf.id === managedFile.id ? { ...mf, progress } : mf,
                  ),
                );
              })
                .then((url) => {
                  setManagedFiles((prev) =>
                    prev.map((mf) =>
                      mf.id === managedFile.id
                        ? { ...mf, status: 'success', url }
                        : mf,
                    ),
                  );
                  onChange([...(rhfValue || []), url]);
                })
                .catch((uploadError) => {
                  setManagedFiles((prev) =>
                    prev.map((mf) =>
                      mf.id === managedFile.id
                        ? { ...mf, status: 'error', error: uploadError }
                        : mf,
                    ),
                  );
                });
            });
          },
          [rhfValue, onChange],
        );

        const onRemove = (id: string) => {
          const fileToRemove = managedFiles.find((mf) => mf.id === id);
          setManagedFiles((prev) => prev.filter((mf) => mf.id !== id));
          if (fileToRemove?.url) {
            onChange(
              (rhfValue || []).filter(
                (url: string) => url !== fileToRemove.url,
              ),
            );
          }
        };

        const { getRootProps, getInputProps, isDragActive, open } = useDropzone(
          {
            onDrop,
            noClick: true,
          },
        );

        return (
          <Box>
            <StyledDropZone {...getRootProps()} isDragActive={isDragActive}>
              <input {...getInputProps()} />
              <StyledFileStack direction="row" spacing={2} alignItems="center">
                {managedFiles.map((file) => (
                  <FilePreviewItem
                    key={file.id}
                    file={file}
                    onRemove={() => onRemove(file.id)}
                  />
                ))}
                {renderUploadZone(open)}
              </StyledFileStack>
            </StyledDropZone>
            {error && (
              <FormHelperText error sx={{ mt: 1 }}>
                {error.message}
              </FormHelperText>
            )}
          </Box>
        );
      }}
    />
  );
};

export default MultiUploader;
