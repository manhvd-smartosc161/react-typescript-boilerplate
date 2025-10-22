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
import {
  yesNoOptions,
  deliveryModeOptions,
  dayOptions,
  siteStatusOptions,
} from '@src/constants';

interface SupplierSupplierSiteFieldsProps {
  control: Control<any>;
  sectionPrefix: string;
}

const SupplierSupplierSiteFields: React.FC<SupplierSupplierSiteFieldsProps> = ({
  control,
  sectionPrefix,
}) => {
  const {
    fields: siteFields,
    append: appendSite,
    remove: removeSite,
  } = useFieldArray({
    control,
    name: sectionPrefix,
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
      addressId: '',
      paymentIds: [],
      returnableSupplier: 'N',
      deliveryMode: 'STANDARD_DELIVERY',
      overReceivingFlag: 'N',
      percentOffInvoice: [],
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
              name={`${sectionPrefix}.${siteIndex}.percentOffInvoice.${invoiceIndex}.amount`}
              control={control}
              label="Amount (%)"
              placeholder="0.0"
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ControlledDatePickerField
              name={`${sectionPrefix}.${siteIndex}.percentOffInvoice.${invoiceIndex}.start_date`}
              control={control}
              label="Start Date"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ControlledDatePickerField
              name={`${sectionPrefix}.${siteIndex}.percentOffInvoice.${invoiceIndex}.end_date`}
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

  const PercentOffInvoiceList = ({ siteIndex }: { siteIndex: number }) => {
    const invoices =
      useWatch({
        control,
        name: `${sectionPrefix}.${siteIndex}.percentOffInvoice`,
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
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              required
              name={`${sectionPrefix}.${index}.name`}
              control={control}
              label="Site Name"
              placeholder="Enter site name"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              variant="outlined"
              required
              name={`${sectionPrefix}.${index}.addressId`}
              control={control}
              label="Address"
              placeholder="Select address"
              options={addressOptions}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ControlledCheckBoxField
              control={control}
              name={`${sectionPrefix}.${index}.paymentIds`}
              label="Associated Payments"
              options={paymentOptions}
              columns={3}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              variant="outlined"
              required
              name={`${sectionPrefix}.${index}.returnableSupplier`}
              control={control}
              label="Returnable Supplier"
              placeholder="Select if returnable"
              options={yesNoOptions}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              variant="outlined"
              required
              name={`${sectionPrefix}.${index}.deliveryMode`}
              control={control}
              label="Delivery Mode"
              placeholder="Select delivery mode"
              options={deliveryModeOptions}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.${index}.previousTradeNames`}
              control={control}
              label="Previous Trade Names"
              placeholder="Enter previous trade names (optional)"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ControlledCheckBoxField
              control={control}
              name={`${sectionPrefix}.${index}.preferredOrderDay`}
              label="Preferred Order Days"
              options={dayOptions}
              columns={4}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ControlledCheckBoxField
              control={control}
              name={`${sectionPrefix}.${index}.preferredDeliveryDay`}
              label="Preferred Delivery Days"
              options={dayOptions}
              columns={4}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.${index}.minOrderValue`}
              control={control}
              label="Minimum Order Value"
              placeholder="0.00"
              type="number"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.${index}.minOrderQty`}
              control={control}
              label="Minimum Order Quantity"
              placeholder="0.0"
              type="number"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              variant="outlined"
              required
              name={`${sectionPrefix}.${index}.overReceivingFlag`}
              control={control}
              label="Over Receiving Flag"
              placeholder="Select flag"
              options={yesNoOptions}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              variant="outlined"
              required
              name={`${sectionPrefix}.${index}.status`}
              control={control}
              label="Status"
              placeholder="Select status"
              options={siteStatusOptions}
            />
          </Grid>
        </Grid>

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
            sx={{ mt: 1 }}
          >
            Add Percent Off Invoice
          </Button>
        </Box>
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

export default SupplierSupplierSiteFields;
