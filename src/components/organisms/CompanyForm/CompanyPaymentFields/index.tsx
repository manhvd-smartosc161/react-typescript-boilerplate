import { Box, Button, Grid, IconButton } from '@mui/material';
import { ButtonAtom, IconAtom, TextAtom } from '@src/components/atoms';
import {
  CollapsibleCard,
  ControlledDropdownField,
  ControlledTextField,
  ControlledTextAreaField,
} from '@src/components/molecules';
import { Control, useFieldArray } from 'react-hook-form';
import { Add as AddIcon } from '@mui/icons-material';
import { COMPANY_INFO_CONST } from '@src/constants';

interface CompanyPaymentFieldsProps {
  control: Control<any>;
  sectionPrefix: string;
}

const CompanyPaymentFields: React.FC<CompanyPaymentFieldsProps> = ({
  control,
  sectionPrefix,
}) => {
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
      bank_name: '',
      bank_branch: '',
      account_number: '',
      account_name: '',
      account_type: 'CURRENT',
      proof_attached: 'N',
      remittance_email: '',
      payee_name: '',
      ap_type: 'NORMAL',
      payment_term: '',
      additional_payment_term: '',
      invoice_submit_channel: 'WEB',
      vendor_traits: 'MBAS_SUPPLIER',
      send_remittance_advise: 'N',
      status: 'ACTIVE',
    });
  };

  const RenderPaymentItem = (index: number) => {
    return (
      <Grid container spacing={3}>
        {/* Payment Method */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.method`}
            control={control}
            label="Payment Method"
            placeholder="Select payment method"
            options={COMPANY_INFO_CONST.paymentMethodOptions}
          />
        </Grid>

        {/* Currency */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.currency`}
            control={control}
            label="Currency"
            placeholder="Select currency"
            options={COMPANY_INFO_CONST.currencyOptions}
          />
        </Grid>

        {/* Bank Name */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.bank_name`}
            control={control}
            label="Bank Name"
            placeholder="Enter bank name"
          />
        </Grid>

        {/* Bank Branch */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.bank_branch`}
            control={control}
            label="Bank Branch"
            placeholder="Enter bank branch"
          />
        </Grid>

        {/* Account Number */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.account_number`}
            control={control}
            label="Account Number"
            placeholder="Enter account number"
          />
        </Grid>

        {/* Account Name */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.account_name`}
            control={control}
            label="Account Name"
            placeholder="Enter account name"
          />
        </Grid>

        {/* Account Type */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.account_type`}
            control={control}
            label="Account Type"
            placeholder="Select account type"
            options={COMPANY_INFO_CONST.accountTypeOptions}
          />
        </Grid>

        {/* Proof Attached */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.proof_attached`}
            control={control}
            label="Proof Attached"
            placeholder="Select if proof attached"
            options={COMPANY_INFO_CONST.yesNoOptions}
          />
        </Grid>

        {/* Remittance Email */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.remittance_email`}
            control={control}
            label="Remittance Email"
            placeholder="Enter remittance email"
            type="email"
          />
        </Grid>

        {/* Payee Name */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.payee_name`}
            control={control}
            label="Payee Name"
            placeholder="Enter payee name"
          />
        </Grid>

        {/* AP Type */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.ap_type`}
            control={control}
            label="AP Type"
            placeholder="Select AP type"
            options={COMPANY_INFO_CONST.apTypeOptions}
          />
        </Grid>

        {/* Payment Term */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.payment_term`}
            control={control}
            label="Payment Term"
            placeholder="Enter payment term (e.g., 45D)"
          />
        </Grid>

        {/* Additional Payment Term */}
        <Grid size={{ xs: 12 }}>
          <ControlledTextAreaField
            name={`${sectionPrefix}.payments.${index}.additional_payment_term`}
            control={control}
            label="Additional Payment Term"
            placeholder="Enter additional payment terms (optional)"
            rows={3}
          />
        </Grid>

        {/* Invoice Submit Channel */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.invoice_submit_channel`}
            control={control}
            label="Invoice Submit Channel"
            placeholder="Select submit channel"
            options={COMPANY_INFO_CONST.invoiceSubmitChannelOptions}
          />
        </Grid>

        {/* Vendor Traits */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.vendor_traits`}
            control={control}
            label="Vendor Traits"
            placeholder="Select vendor traits"
            options={COMPANY_INFO_CONST.vendorTraitsOptions}
          />
        </Grid>

        {/* Send Remittance Advise */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.send_remittance_advise`}
            control={control}
            label="Send Remittance Advise"
            placeholder="Select preference"
            options={COMPANY_INFO_CONST.yesNoOptions}
          />
        </Grid>

        {/* Status */}
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.status`}
            control={control}
            label="Status"
            placeholder="Select status"
            options={COMPANY_INFO_CONST.paymentStatusOptions}
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
                Duplicate Payment
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
          title={<TextAtom weight={'bold'}>Payment #{index + 1}</TextAtom>}
        >
          {RenderPaymentItem(index)}
        </CollapsibleCard>
      ))}

      {paymentFields.length === 0 && (
        <TextAtom variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          No payments added yet. Click "Add Payment" to get started.
        </TextAtom>
      )}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addNewPayment}
        sx={{ mt: 2 }}
      >
        Add Payment
      </Button>
    </Box>
  );
};

export default CompanyPaymentFields;
