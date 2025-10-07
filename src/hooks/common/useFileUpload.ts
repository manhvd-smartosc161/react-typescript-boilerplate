import { useState, useCallback } from 'react';
import {
  ManagedFile,
  FileStatus,
} from '@src/components/molecules/FilePreviewItem';

const uploadFile = (
  file: File,
  onProgress: (percent: number) => void,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      onProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        if (file.name.includes('fail')) {
          reject('Upload failed!');
        } else {
          resolve(`https://fake-server.com/uploads/${file.name}`);
        }
      }
    }, 300);
  });
};

interface UseFileUploadProps {
  onChange: (urls: string[]) => void;
  value?: string[];
}

export const useFileUpload = ({ onChange, value }: UseFileUploadProps) => {
  const [managedFiles, setManagedFiles] = useState<ManagedFile[]>([]);

  const syncFilesWithValue = useCallback(
    (urls: string[]) => {
      const newFiles: ManagedFile[] = urls
        .filter((url) => !managedFiles.some((mf) => mf.url === url))
        .map((url) => ({
          id: url,
          url,
          name: url.split('/').pop() || 'uploaded-file',
          status: 'success' as FileStatus,
          progress: 100,
        }));

      if (newFiles.length > 0) {
        setManagedFiles((prev) => [...prev, ...newFiles]);
      }
    },
    [managedFiles],
  );

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newManagedFiles: ManagedFile[] = acceptedFiles.map((file) => ({
        id: `${file.name}-${file.lastModified}`,
        file,
        name: file.name,
        status: 'uploading' as FileStatus,
        progress: 0,
      }));

      setManagedFiles((prev) => [...prev, ...newManagedFiles]);

      newManagedFiles.forEach((managedFile) => {
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
                  ? { ...mf, status: 'success' as FileStatus, url }
                  : mf,
              ),
            );
            onChange([...(value || []), url]);
          })
          .catch((uploadError) => {
            setManagedFiles((prev) =>
              prev.map((mf) =>
                mf.id === managedFile.id
                  ? {
                      ...mf,
                      status: 'error' as FileStatus,
                      error: uploadError,
                    }
                  : mf,
              ),
            );
          });
      });
    },
    [value, onChange],
  );

  const handleRemove = useCallback(
    (id: string) => {
      const fileToRemove = managedFiles.find((mf) => mf.id === id);
      if (!fileToRemove) return;

      setManagedFiles((prev) => prev.filter((mf) => mf.id !== id));

      if (fileToRemove.url) {
        onChange((value || []).filter((url) => url !== fileToRemove.url));
      }
    },
    [managedFiles, onChange, value],
  );

  return {
    managedFiles,
    handleDrop,
    handleRemove,
    syncFilesWithValue,
  };
};
