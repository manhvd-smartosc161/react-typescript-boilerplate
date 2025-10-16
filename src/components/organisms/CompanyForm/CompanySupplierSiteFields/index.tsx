import React from 'react';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { ButtonAtom, IconAtom, TextAtom } from '@src/components/atoms';
import {
  CollapsibleCard,
  ControlledDropdownField,
  ControlledTextField,
  ControlledCheckBoxField,
  ControlledDatePickerField,
} from '@src/components/molecules';
import { Control, useFieldArray, useWatch } from 'react-hook-form';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { COMPANY_INFO_CONST } from '@src/constants';

interface CompanySupplierSiteFieldsProps {
  control: Control<any>;
  sectionPrefix: string;
}

const CompanySupplierSiteFields: React.FC<CompanySupplierSiteFieldsProps> = ({
  control,
  sectionPrefix,
}) => {
  const {
    fields: siteFields,
    append: appendSite,
    remove: removeSite,
  } = useFieldArray({
    control,
    name: `${sectionPrefix}.sites`,
  });

  const addresses = useWatch({
    control,
    name: `${sectionPrefix}.addresses`,
  });

  const payments = useWatch({
    control,
    name: `${sectionPrefix}.payments`,
  });

  const addressOptions =
    addresses?.map((address: any) => ({
      label: `${address.name}`,
      value: address.id,
    })) || [];

  const paymentOptions =
    payments?.map((payment: any) => ({
      label: `${payment.method} (${payment.account_name})`,
      value: payment.id,
    })) || [];

  const duplicateSite = (index: number) => {
    const newSite = siteFields[index];
    appendSite(newSite);
  };

  const addNewSite = () => {
    appendSite({
      name: '',
      address_id: '',
      payment_ids: [],
      returnable_supplier: 'N',
      delivery_mode: 'STANDARD_DELIVERY',
      over_receiving_flag: 'N',
      percent_off_invoice: [],
      dnb_finance: {
        due_diligence_remarks: '',
        due_diligence_result: 'PENDING',
        rating_remarks: '',
        rating: '',
        rating_memo: '',
        credit_term_status: 'FOLLOW',
        credit_term_memo: '',
        company_status: 'N',
      },
    });
  };

  const RenderPercentOffInvoice = (siteIndex: number, invoiceIndex: number) => {
    return (
      <Box
        sx={{
          mb: 2,
          p: 2,
          border: '1px solid #e0e0e0',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Grid container spacing={2} sx={{ flex: 1 }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.sites.${siteIndex}.percent_off_invoice.${invoiceIndex}.amount`}
              control={control}
              label="Amount (%)"
              placeholder="0.0"
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ControlledDatePickerField
              name={`${sectionPrefix}.sites.${siteIndex}.percent_off_invoice.${invoiceIndex}.start_date`}
              control={control}
              label="Start Date"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ControlledDatePickerField
              name={`${sectionPrefix}.sites.${siteIndex}.percent_off_invoice.${invoiceIndex}.end_date`}
              control={control}
              label="End Date"
            />
          </Grid>
        </Grid>
        <IconButton
          size="small"
          color="error"
          disabled
          onClick={() => {
            // TODO: Implement deletion of percent off invoice items
            // This requires a more complex form state management approach
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    );
  };

  const RenderDnbFinance = (siteIndex: number) => {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          D&B Finance Information
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.sites.${siteIndex}.dnb_finance.due_diligence_remarks`}
              control={control}
              label="Due Diligence Remarks"
              placeholder="Enter remarks"
              multiline
              rows={3}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              variant="outlined"
              name={`${sectionPrefix}.sites.${siteIndex}.dnb_finance.due_diligence_result`}
              control={control}
              label="Due Diligence Result"
              placeholder="Select result"
              options={COMPANY_INFO_CONST.dueDiligenceResultOptions}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.sites.${siteIndex}.dnb_finance.rating_remarks`}
              control={control}
              label="Rating Remarks"
              placeholder="Enter rating remarks"
              multiline
              rows={2}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.sites.${siteIndex}.dnb_finance.rating`}
              control={control}
              label="Rating"
              placeholder="Enter rating"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.sites.${siteIndex}.dnb_finance.rating_memo`}
              control={control}
              label="Rating Memo"
              placeholder="Enter rating memo"
              multiline
              rows={2}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              variant="outlined"
              name={`${sectionPrefix}.sites.${siteIndex}.dnb_finance.credit_term_status`}
              control={control}
              label="Credit Term Status"
              placeholder="Select status"
              options={COMPANY_INFO_CONST.creditTermStatusOptions}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.sites.${siteIndex}.dnb_finance.credit_term_memo`}
              control={control}
              label="Credit Term Memo"
              placeholder="Enter credit term memo"
              multiline
              rows={2}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              variant="outlined"
              name={`${sectionPrefix}.sites.${siteIndex}.dnb_finance.company_status`}
              control={control}
              label="Company Status"
              placeholder="Select status"
              options={COMPANY_INFO_CONST.companyStatusOptions}
            />
          </Grid>
        </Grid>
      </Box>
    );
  };

  const PercentOffInvoiceList = ({ siteIndex }: { siteIndex: number }) => {
    const invoices =
      useWatch({
        control,
        name: `${sectionPrefix}.sites.${siteIndex}.percent_off_invoice`,
      }) || [];

    return (
      <Box>
        {invoices.map((_: any, invoiceIndex: number) =>
          RenderPercentOffInvoice(siteIndex, invoiceIndex),
        )}
      </Box>
    );
  };

  const RenderSiteItem = (index: number) => {
    return (
      <Box>
        <Grid container spacing={3}>
          {/* Site Name */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              required
              name={`${sectionPrefix}.sites.${index}.name`}
              control={control}
              label="Site Name"
              placeholder="Enter site name"
            />
          </Grid>

          {/* Address Selection */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              variant="outlined"
              required
              name={`${sectionPrefix}.sites.${index}.address_id`}
              control={control}
              label="Address"
              placeholder="Select address"
              options={addressOptions}
            />
          </Grid>

          {/* Payment Selection */}
          <Grid size={{ xs: 12 }}>
            <ControlledCheckBoxField
              control={control}
              name={`${sectionPrefix}.sites.${index}.payment_ids`}
              label="Associated Payments"
              options={paymentOptions}
              columns={3}
            />
          </Grid>

          {/* Returnable Supplier */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              variant="outlined"
              required
              name={`${sectionPrefix}.sites.${index}.returnable_supplier`}
              control={control}
              label="Returnable Supplier"
              placeholder="Select if returnable"
              options={COMPANY_INFO_CONST.yesNoOptions}
            />
          </Grid>

          {/* Delivery Mode */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              variant="outlined"
              required
              name={`${sectionPrefix}.sites.${index}.delivery_mode`}
              control={control}
              label="Delivery Mode"
              placeholder="Select delivery mode"
              options={COMPANY_INFO_CONST.deliveryModeOptions}
            />
          </Grid>

          {/* Previous Trade Names */}
          <Grid size={{ xs: 12 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.sites.${index}.previous_trade_names`}
              control={control}
              label="Previous Trade Names"
              placeholder="Enter previous trade names (optional)"
            />
          </Grid>

          {/* Preferred Order Days */}
          <Grid size={{ xs: 12 }}>
            <ControlledCheckBoxField
              control={control}
              name={`${sectionPrefix}.sites.${index}.preferred_order_day`}
              label="Preferred Order Days"
              options={COMPANY_INFO_CONST.weekDayOptions}
              columns={4}
            />
          </Grid>

          {/* Preferred Delivery Days */}
          <Grid size={{ xs: 12 }}>
            <ControlledCheckBoxField
              control={control}
              name={`${sectionPrefix}.sites.${index}.preferred_delivery_day`}
              label="Preferred Delivery Days"
              options={COMPANY_INFO_CONST.weekDayOptions}
              columns={4}
            />
          </Grid>

          {/* Min Order Value */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.sites.${index}.min_order_value`}
              control={control}
              label="Minimum Order Value"
              placeholder="0.00"
              type="number"
            />
          </Grid>

          {/* Min Order Qty */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.sites.${index}.min_order_qty`}
              control={control}
              label="Minimum Order Quantity"
              placeholder="0.0"
              type="number"
            />
          </Grid>

          {/* Over Receiving Flag */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              variant="outlined"
              required
              name={`${sectionPrefix}.sites.${index}.over_receiving_flag`}
              control={control}
              label="Over Receiving Flag"
              placeholder="Select flag"
              options={COMPANY_INFO_CONST.yesNoOptions}
            />
          </Grid>

          {/* Status */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              variant="outlined"
              required
              name={`${sectionPrefix}.sites.${index}.status`}
              control={control}
              label="Status"
              placeholder="Select status"
              options={COMPANY_INFO_CONST.siteStatusOptions}
            />
          </Grid>
        </Grid>

        {/* Percent Off Invoice Section */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Percent Off Invoice
          </Typography>
          <PercentOffInvoiceList siteIndex={index} />
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => {
              // TODO: Implement dynamic addition of percent off invoice items
              // This requires a more complex form state management approach
            }}
            disabled
            sx={{ mt: 1 }}
          >
            Add Percent Off Invoice
          </Button>
        </Box>

        {/* D&B Finance Section */}
        <Box sx={{ mt: 3 }}>{RenderDnbFinance(index)}</Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      {siteFields.map((field, index) => (
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
                onClick={() => duplicateSite(index)}
              >
                Duplicate Site
              </ButtonAtom>
              <IconButton
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '8px',
                }}
                onClick={() => removeSite(index)}
              >
                <IconAtom name="delete" />
              </IconButton>
            </>
          }
          title={<TextAtom weight={'bold'}>Site #{index + 1}</TextAtom>}
        >
          {RenderSiteItem(index)}
        </CollapsibleCard>
      ))}

      {siteFields.length === 0 && (
        <TextAtom variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          No sites added yet. Click "Add Site" to get started.
        </TextAtom>
      )}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addNewSite}
        sx={{ mt: 2 }}
      >
        Add Site
      </Button>
    </Box>
  );
};

export default CompanySupplierSiteFields;
