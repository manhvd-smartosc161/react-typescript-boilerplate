import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useFormContext, FieldPath } from 'react-hook-form';
import { Box, Typography, Stack, FormHelperText } from '@mui/material';
import FilePreviewItem, {
  ManagedFile,
} from '@src/components/molecules/FilePreviewItem';
import { AddFileButton } from '@src/components/molecules';

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

// TODO: Refactor this component when the API is ready for integration
const MultiUploader: React.FC<MultiUploaderProps> = ({ name, label }) => {
  const { control } = useFormContext();
  const [managedFiles, setManagedFiles] = useState<ManagedFile[]>([]);

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

        const { getRootProps, getInputProps } = useDropzone({
          onDrop,
          // noClick: true,
        });

        return (
          <Box>
            <Typography
              variant="h6"
              component="label"
              sx={{ mb: 1.5, display: 'block' }}
            >
              {label}
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ position: 'relative' }}
            >
              {managedFiles.map((file) => (
                <FilePreviewItem
                  key={file.id}
                  file={file}
                  onRemove={() => onRemove(file.id)}
                />
              ))}
              <Box {...getRootProps()}>
                <input {...getInputProps()} />
                <AddFileButton />
              </Box>
            </Stack>
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
