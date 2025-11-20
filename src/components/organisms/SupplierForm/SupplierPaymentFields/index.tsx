import { Box, Button, Grid, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ButtonAtom, IconAtom, TextAtom } from '@src/components/atoms';
import {
  CollapsibleCard,
  ControlledDropdownField,
  ControlledTextField,
  ControlledTextAreaField,
} from '@src/components/molecules';
import { Control, useFieldArray } from 'react-hook-form';
import { Add as AddIcon } from '@mui/icons-material';
import {
  yesNoOptions,
  currencyOptions,
  accountTypeOptions,
  apTypeOptions,
  invoiceSubmitChannelOptions,
  vendorTraintsOptions,
  paymentStatusOptions,
} from '@src/constants';

interface SupplierPaymentFieldsProps {
  control: Control<any>;
  sectionPrefix: string;
}

const SupplierPaymentFields: React.FC<SupplierPaymentFieldsProps> = ({
  control,
  sectionPrefix,
}) => {
  const { t } = useTranslation('supplier');
  const {
    fields: paymentFields,
    append: appendPayment,
    remove: removePayment,
  } = useFieldArray({
    control,
    name: `${sectionPrefix}.payments`,
  });

  const duplicatePayment = (index: number) => {
    const newPayment = paymentFields[index];
    appendPayment(newPayment);
  };

  const addNewPayment = () => {
    appendPayment({
      method: '01 - Cheque',
      currency: 'THB',
      bankName: '',
      bankBranch: '',
      accountNumber: '',
      accountName: '',
      accountType: 'CURRENT',
      proofAttached: 'N',
      remittanceEmail: '',
      payeeName: '',
      apType: 'NORMAL',
      paymentTerm: '',
      additionalPaymentTerm: '',
      invoiceSubmitChannel: 'WEB',
      vendorTraints: 'MBAS_SUPPLIER',
      sendRemittanceAdvise: 'N',
      status: 'ACTIVE',
    });
  };

  const RenderPaymentItem = (index: number) => {
    return (
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.method`}
            control={control}
            label={t('form.fields.paymentMethod')}
            placeholder={t('form.fields.paymentMethodPlaceholder')}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.currency`}
            control={control}
            label={t('form.fields.currency')}
            placeholder={t('form.fields.currencyPlaceholder')}
            options={currencyOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.bankName`}
            control={control}
            label={t('form.fields.bankName')}
            placeholder={t('form.fields.bankNamePlaceholder')}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.bankBranch`}
            control={control}
            label={t('form.fields.bankBranch')}
            placeholder={t('form.fields.bankBranchPlaceholder')}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.accountNumber`}
            control={control}
            label={t('form.fields.accountNumber')}
            placeholder={t('form.fields.accountNumberPlaceholder')}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.accountName`}
            control={control}
            label={t('form.fields.accountName')}
            placeholder={t('form.fields.accountNamePlaceholder')}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.accountType`}
            control={control}
            label={t('form.fields.accountType')}
            placeholder={t('form.fields.accountTypePlaceholder')}
            options={accountTypeOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.proofAttached`}
            control={control}
            label={t('form.fields.proofAttached')}
            placeholder={t('form.fields.proofAttachedPlaceholder')}
            options={yesNoOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.remittanceEmail`}
            control={control}
            label={t('form.fields.remittanceEmail')}
            placeholder={t('form.fields.remittanceEmailPlaceholder')}
            type="email"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.payeeName`}
            control={control}
            label={t('form.fields.payeeName')}
            placeholder={t('form.fields.payeeNamePlaceholder')}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.apType`}
            control={control}
            label={t('form.fields.apType')}
            placeholder={t('form.fields.apTypePlaceholder')}
            options={apTypeOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.paymentTerm`}
            control={control}
            label={t('form.fields.paymentTerm')}
            placeholder={t('form.fields.paymentTermPlaceholder')}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ControlledTextAreaField
            name={`${sectionPrefix}.payments.${index}.additionalPaymentTerm`}
            control={control}
            label={t('form.fields.additionalPaymentTerm')}
            placeholder={t('form.fields.additionalPaymentTermPlaceholder')}
            rows={3}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.invoiceSubmitChannel`}
            control={control}
            label={t('form.fields.invoiceSubmitChannel')}
            placeholder={t('form.fields.invoiceSubmitChannelPlaceholder')}
            options={invoiceSubmitChannelOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.vendorTraints`}
            control={control}
            label={t('form.fields.vendorTraits')}
            placeholder={t('form.fields.vendorTraitsPlaceholder')}
            options={vendorTraintsOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.sendRemittanceAdvise`}
            control={control}
            label={t('form.fields.sendRemittanceAdvise')}
            placeholder={t('form.fields.sendRemittanceAdvisePlaceholder')}
            options={yesNoOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.status`}
            control={control}
            label={t('form.fields.status')}
            placeholder={t('form.fields.statusPlaceholder')}
            options={paymentStatusOptions}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      {paymentFields.map((field, index) => (
        <CollapsibleCard
          key={field.id}
          actions={
            <>
              <ButtonAtom
                disableElevation
                variant="secondary"
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '8px',
                }}
                startIcon={<IconAtom name="edit" />}
                onClick={() => duplicatePayment(index)}
              >
                {t('form.fields.duplicatePayment')}
              </ButtonAtom>
              <IconButton
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '8px',
                }}
                onClick={() => removePayment(index)}
              >
                <IconAtom name="delete" />
              </IconButton>
            </>
          }
          title={
            <TextAtom weight={'bold'}>
              {t('form.fields.paymentNumber')}
              {index + 1}
            </TextAtom>
          }
        >
          {RenderPaymentItem(index)}
        </CollapsibleCard>
      ))}

      {paymentFields.length === 0 && (
        <TextAtom variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          {t('form.fields.noPaymentsAdded')}
        </TextAtom>
      )}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addNewPayment}
        sx={{ mt: 2 }}
      >
        {t('form.fields.addPayment')}
      </Button>
    </Box>
  );
};

export default SupplierPaymentFields;
