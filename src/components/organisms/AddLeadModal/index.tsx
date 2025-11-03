import React from 'react';
import { Box, Typography } from '@mui/material';
import { ButtonAtom } from '@src/components/atoms';
import { ModalDialog } from '@src/components/molecules/ModalDialog';
import { FormProvider, useForm } from 'react-hook-form';
import ControlledAutocompleteMultiField from '@src/components/molecules/ControlledAutocompleteMultiField';
import {
  ControlledTextAreaField,
  ControlledTextField,
} from '@src/components/molecules';

export interface AddLeadModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const AddLeadModal: React.FC<AddLeadModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const formMethods = useForm({
    defaultValues: {
      saleAt: [],
      email: '',
      companyName: [],
      productCategory: [],
      remarks: '',
    },
    mode: 'onSubmit',
  });
  const { handleSubmit, control } = formMethods;

  const handleSubmitAddLead = () => {
    console.log('submmit');
  };

  const footer = (
    <>
      <ButtonAtom
        variant="primary"
        color="primary"
        onClick={onSubmit}
        sx={{ textTransform: 'none' }}
      >
        Add
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
      title="Add New Lead"
      footer={footer}
      showFooter
      fullWidth
      maxWidth="md"
    >
      <FormProvider {...formMethods}>
        <form
          id="registration-form"
          onSubmit={handleSubmit(handleSubmitAddLead)}
          noValidate
        >
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Sales at */}
            <ControlledAutocompleteMultiField
              name="saleAt"
              options={[
                {
                  id: 'lotus',
                  label: "Lotus's",
                },
                {
                  id: 'makro',
                  label: 'Makro',
                },
                {
                  id: 'retailerName',
                  label: 'Retailer Name',
                },
              ]}
              control={control}
              label="Sale At"
              required
              placeholder="Select sales"
            />

            {/* Email */}
            <ControlledTextField
              required
              fullWidth
              name="email"
              label="Email"
              placeholder="email@address.com"
              control={control}
            />

            {/* Company Name */}
            <ControlledAutocompleteMultiField
              name="companyName"
              options={[
                {
                  id: 'companyName1',
                  label: 'companyName1',
                },
                {
                  id: 'companyName2',
                  label: 'companyName2',
                },
              ]}
              control={control}
              label="Company Name"
              required
              placeholder="Company / Supplier Name"
            />

            {/* Product Category */}
            <ControlledAutocompleteMultiField
              name="productCategory"
              options={[
                {
                  id: 'food',
                  label: 'food',
                },
                {
                  id: 'beverage',
                  label: 'Beverage',
                },
                {
                  id: 'categoryName',
                  label: 'Category name',
                },
              ]}
              control={control}
              label="Product Category"
              required
              placeholder="Select product category"
            />

            {/* Remarks */}
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                Remarks (Reason / USP / Differentiators)
              </Typography>
              <ControlledTextAreaField
                fullWidth
                minRows={3}
                control={control}
                name="remarks"
                placeholder="What makes this lead unique (organic, high margin, innovative, ...)"
              />
            </Box>
          </Box>
        </form>
      </FormProvider>
    </ModalDialog>
  );
};
