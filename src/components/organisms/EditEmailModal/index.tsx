import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { ButtonAtom } from '@src/components/atoms';
import { ModalDialog } from '@src/components/molecules';
import { FormProvider, useForm } from 'react-hook-form';
import {
  ControlledTextAreaField,
  ControlledTextField,
} from '@src/components/molecules';
import { EmailSettingItem } from '@src/mock/emailSettingsData';

export interface EditEmailModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    subject: string;
    emailEn: string;
    emailTh: string;
    remark: string;
  }) => void;
  initialData?: EmailSettingItem | null;
}

const EditEmailModal: React.FC<EditEmailModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const formMethods = useForm({
    defaultValues: {
      subject: '',
      emailEn: '',
      emailTh: '',
      remark: '',
    },
    mode: 'onSubmit',
  });
  const { handleSubmit, control, reset } = formMethods;

  useEffect(() => {
    if (initialData && open) {
      reset({
        subject: initialData.subject || '',
        emailEn: initialData.emailEn || '',
        emailTh: initialData.emailTh || '',
        remark: initialData.remarks || '',
      });
    }
  }, [initialData, open, reset]);

  const handleFormSubmit = (data: {
    subject: string;
    emailEn: string;
    emailTh: string;
    remark: string;
  }) => {
    onSubmit(data);
    onClose();
  };

  const footer = (
    <>
      <ButtonAtom
        variant="primary"
        color="primary"
        onClick={handleSubmit(handleFormSubmit)}
        sx={{ textTransform: 'none' }}
      >
        Update
      </ButtonAtom>
      <ButtonAtom
        variant="secondary"
        color="inherit"
        onClick={onClose}
        sx={{ textTransform: 'none' }}
      >
        Cancel
      </ButtonAtom>
    </>
  );

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title="Edit email"
      footer={footer}
      showFooter
      fullWidth
      maxWidth="md"
    >
      <FormProvider {...formMethods}>
        <form
          id="edit-email-form"
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
        >
          <Box display="flex" flexDirection="column" gap={3}>
            <ControlledTextField
              name="subject"
              control={control}
              label="Subject"
              placeholder="Enter subject"
              required
              fullWidth
            />

            <ControlledTextAreaField
              name="emailEn"
              control={control}
              label="Email EN"
              placeholder="Enter email content in English"
              required
              fullWidth
              minRows={4}
            />

            <ControlledTextAreaField
              name="emailTh"
              control={control}
              label="Email TH"
              placeholder="Enter email content in Thai"
              required
              fullWidth
              minRows={4}
            />

            <ControlledTextField
              name="remark"
              control={control}
              label="Remark"
              placeholder="Enter remark"
              fullWidth
            />
          </Box>
        </form>
      </FormProvider>
    </ModalDialog>
  );
};

export default EditEmailModal;
