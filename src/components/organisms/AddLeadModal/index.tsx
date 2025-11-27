import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import { ButtonAtom } from '@src/components/atoms';
import {
  ModalDialog,
  ControlledAutocompleteMultiField,
  ControlledTextField,
  ControlledTextAreaField,
} from '@src/components/molecules';
import { leadSchema } from '@src/schemas';
import { AddLeadFormValue } from '@src/types';

export interface AddLeadModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AddLeadFormValue) => void;
}

const AddLeadModal: React.FC<AddLeadModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation('lead');
  const formMethods = useForm({
    resolver: yupResolver(leadSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: {
      saleAt: [],
      email: '',
      companyName: '',
      productCategory: [],
      remarks: '',
    },
  });
  const { handleSubmit, control } = formMethods;

  const handleSubmitAddLead = async (form: AddLeadFormValue) => {
    onSubmit(form);
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
      >
        {t('add')}
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
      title={t('addNewLead')}
      footer={footer}
      showFooter
      fullWidth
      maxWidth="md"
    >
      <FormProvider {...formMethods}>
        <form
          id="add-lead-form"
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
              label={t('saleAt')}
              required
              placeholder={t('selectSales')}
            />

            {/* Email */}
            <ControlledTextField
              required
              fullWidth
              name="email"
              label={t('email')}
              placeholder="email@address.com"
              control={control}
            />

            {/* Company Name */}
            <ControlledTextField
              required
              fullWidth
              name="companyName"
              label={t('companyName')}
              placeholder={t('companySuplierName')}
              control={control}
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
              label={t('productCategory')}
              required
              placeholder={t('selectProductCategory')}
            />

            {/* Remarks */}
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                {t('remarksLabel')}
              </Typography>
              <ControlledTextAreaField
                fullWidth
                minRows={3}
                control={control}
                name="remarks"
                placeholder={t('remarksPlaceholder')}
              />
            </Box>
          </Box>
        </form>
      </FormProvider>
    </ModalDialog>
  );
};

export default AddLeadModal;
