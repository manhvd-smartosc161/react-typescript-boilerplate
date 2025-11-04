import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import { ModalDialog } from '@src/components/molecules/ModalDialog';
import { ButtonAtom } from '@src/components/atoms';
import {
  ControlledDropdownField,
  ControlledDatePickerField,
  ControlledTextAreaField,
  ControlledCheckBoxField,
} from '@src/components/molecules';
import { ContractItem } from '@src/mock/contractsData';
import { terminationSchema } from '@src/schemas';
import {
  StyledSelectedSuppliers,
  StyledTextAreaWrapper,
  StyledCharacterCount,
} from './index.styled';

export interface TerminationFormData {
  terminationReason: string;
  effectiveDate: string;
  remarks?: string;
  sendEmailNotification: boolean;
}

export interface ContractTerminationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TerminationFormData) => void;
  selectedContracts: ContractItem[];
}

const TERMINATION_REASONS = [
  { value: 'performance', label: 'Performance Issue' },
  { value: 'financial', label: 'Financial Issue' },
  { value: 'legal', label: 'Legal Issue' },
  { value: 'duplicated', label: 'Duplicated Supplier' },
];

const ContractTerminationModal: React.FC<ContractTerminationModalProps> = ({
  open,
  onClose,
  onSubmit,
  selectedContracts,
}) => {
  const formMethods = useForm<TerminationFormData>({
    resolver: yupResolver(terminationSchema),
    defaultValues: {
      terminationReason: '',
      effectiveDate: '',
      remarks: '',
      sendEmailNotification: true,
    },
  });

  const { handleSubmit, watch, reset } = formMethods;

  const remarks = watch('remarks');
  const remarksLength = remarks?.length || 0;
  const maxRemarksLength = 255;

  const handleFormSubmit = (data: TerminationFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const selectedSuppliersText = selectedContracts
    .map((contract) => contract.companyName)
    .join(', ');

  const footer = (
    <>
      <ButtonAtom
        variant="secondary"
        color="inherit"
        onClick={handleClose}
        sx={{
          textTransform: 'none',
          backgroundColor: '#f5f5f5',
          color: '#000',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
        }}
      >
        Cancel
      </ButtonAtom>
      <ButtonAtom
        variant="primary"
        onClick={handleSubmit(handleFormSubmit)}
        type="submit"
        sx={{ textTransform: 'none' }}
      >
        Update
      </ButtonAtom>
    </>
  );

  return (
    <ModalDialog
      open={open}
      onClose={handleClose}
      title="Contract Termination"
      footer={footer}
      showFooter
      fullWidth
      maxWidth="md"
    >
      <FormProvider {...formMethods}>
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Introduction text */}
          <Typography variant="body1" color="text.secondary">
            You are about to terminate contracts for the selected suppliers
          </Typography>

          {/* Selected suppliers */}
          <StyledSelectedSuppliers>
            {selectedContracts.length} supplier
            {selectedContracts.length !== 1 ? 's' : ''} selected:{' '}
            {selectedSuppliersText}
          </StyledSelectedSuppliers>

          {/* Termination Reason */}
          <ControlledDropdownField
            name="terminationReason"
            control={formMethods.control}
            label="Termination Reason"
            placeholder="Please select"
            options={TERMINATION_REASONS}
            required
            fullWidth
          />

          {/* Effective Termination Date */}
          <ControlledDatePickerField
            name="effectiveDate"
            control={formMethods.control}
            label="Effective Termination Date"
            placeholder="Select date"
            required
            fullWidth
            minDate={new Date().toISOString().split('T')[0]}
          />

          {/* Remarks / Notes */}
          <StyledTextAreaWrapper>
            <ControlledTextAreaField
              name="remarks"
              control={formMethods.control}
              label="Remarks / Notes"
              placeholder="Type here"
              fullWidth
              minRows={3}
              maxLength={maxRemarksLength}
            />
            <StyledCharacterCount>
              {remarksLength}/{maxRemarksLength}
            </StyledCharacterCount>
          </StyledTextAreaWrapper>

          {/* Send email notification checkbox */}
          <ControlledCheckBoxField
            name="sendEmailNotification"
            control={formMethods.control}
            label="Send email notification"
            single
          />
        </Box>
      </FormProvider>
    </ModalDialog>
  );
};

export default ContractTerminationModal;
