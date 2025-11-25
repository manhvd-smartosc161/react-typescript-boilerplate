import { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { Link } from '@mui/material';
import { ButtonAtom } from '@src/components/atoms';
import { ModalDialog } from '@src/components/molecules';
import { ManagedFile } from '@src/components/molecules/FilePreviewItem';
import { UploadDropzone } from '@src/components/molecules/UploadDropzone';
import { toast } from 'react-toastify';

interface ImportCSVModalProps {
  open: boolean;
  onClose: () => void;
}

const ImportCSVModal: FC<ImportCSVModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation('item');
  const [managedFiles, setManagedFiles] = useState<ManagedFile[]>([]);
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
            resolve(
              `https://fake-server.com/uploads/${Date.now()}-${file.name}`,
            );
          }
        }
      }, 400);
    });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const first = acceptedFiles[0];
    if (!first) return;
    const newFiles: ManagedFile[] = acceptedFiles.map((file) => {
      const f: ManagedFile = {
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        name: file.name,
        status: 'uploading',
        progress: 0,
      };
      return f;
    });

    setManagedFiles([...newFiles]);

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
              mf.id === managedFile.id ? { ...mf, status: 'success', url } : mf,
            ),
          );
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
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: openDropFile,
  } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'], // CSV
      'application/vnd.ms-excel': ['.xls'], // Old Excel
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
    },
    multiple: false,
  });

  const handleUpload = () => {
    toast.success('Upload isn’t available yet — the feature is coming soon.');
    onClose();
  };

  const footer = (
    <>
      <ButtonAtom
        variant="primary"
        color="primary"
        sx={{ textTransform: 'none' }}
        type="submit"
        form="add-lead-form"
        onClick={handleUpload}
      >
        {t('upload')}
      </ButtonAtom>
      <ButtonAtom
        variant="secondary"
        color="inherit"
        onClick={onClose}
        sx={{ textTransform: 'none' }}
      >
        {t('cancel')}
      </ButtonAtom>
    </>
  );
  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title={t('importFile')}
      footer={footer}
      showFooter
      fullWidth
      maxWidth="md"
    >
      <Link
        href="/templates/product-upload-template.xlsx"
        download
        underline="none"
        sx={{ fontSize: 14, mb: 2, display: 'inline-block' }}
      >
        {t('downloadTemplate')}
      </Link>
      <UploadDropzone
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        open={openDropFile}
        files={managedFiles}
      />
    </ModalDialog>
  );
};

export default ImportCSVModal;
