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
import {
  yesNoOptions,
  currencyOptions,
  accountTypeOptions,
  apTypeOptions,
  invoiceSubmitChannelOptions,
  vendorTraitsOptions,
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
      vendorTraits: 'MBAS_SUPPLIER',
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
            label="Payment Method"
            placeholder="Enter payment method"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.currency`}
            control={control}
            label="Currency"
            placeholder="Select currency"
            options={currencyOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.bankName`}
            control={control}
            label="Bank Name"
            placeholder="Enter bank name"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.bankBranch`}
            control={control}
            label="Bank Branch"
            placeholder="Enter bank branch"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.accountNumber`}
            control={control}
            label="Account Number"
            placeholder="Enter account number"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.accountName`}
            control={control}
            label="Account Name"
            placeholder="Enter account name"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.accountType`}
            control={control}
            label="Account Type"
            placeholder="Select account type"
            options={accountTypeOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.proofAttached`}
            control={control}
            label="Proof Attached"
            placeholder="Select if proof attached"
            options={yesNoOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.remittanceEmail`}
            control={control}
            label="Remittance Email"
            placeholder="Enter remittance email"
            type="email"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.payeeName`}
            control={control}
            label="Payee Name"
            placeholder="Enter payee name"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.apType`}
            control={control}
            label="AP Type"
            placeholder="Select AP type"
            options={apTypeOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.paymentTerm`}
            control={control}
            label="Payment Term"
            placeholder="Enter payment term (e.g., 45D)"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ControlledTextAreaField
            name={`${sectionPrefix}.payments.${index}.additionalPaymentTerm`}
            control={control}
            label="Additional Payment Term"
            placeholder="Enter additional payment terms (optional)"
            rows={3}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.invoiceSubmitChannel`}
            control={control}
            label="Invoice Submit Channel"
            placeholder="Select submit channel"
            options={invoiceSubmitChannelOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.vendorTraits`}
            control={control}
            label="Vendor Traits"
            placeholder="Select vendor traits"
            options={vendorTraitsOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.sendRemittanceAdvise`}
            control={control}
            label="Send Remittance Advise"
            placeholder="Select preference"
            options={yesNoOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            required
            name={`${sectionPrefix}.payments.${index}.status`}
            control={control}
            label="Status"
            placeholder="Select status"
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

export default SupplierPaymentFields;
