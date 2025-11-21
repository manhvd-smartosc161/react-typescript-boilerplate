import React from 'react';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ButtonAtom, IconAtom, TextAtom } from '@src/components/atoms';
import {
  CollapsibleCard,
  ControlledDropdownField,
  ControlledTextField,
  ControlledCheckBoxField,
  ControlledDatePickerField,
} from '@src/components/molecules';
import {
  Control,
  useFieldArray,
  useWatch,
  useFormContext,
} from 'react-hook-form';
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
  readOnly?: boolean;
}

const SupplierSupplierSiteFields: React.FC<SupplierSupplierSiteFieldsProps> = ({
  control,
  sectionPrefix,
  readOnly = false,
}) => {
  const { t } = useTranslation('supplier');
  const { watch, getValues } = useFormContext();

  const {
    fields: siteFields,
    append: appendSite,
    remove: removeSite,
  } = useFieldArray({
    control,
    name: sectionPrefix,
  });

  const addresses = watch('information.addresses') || [];
  const payments = watch('information.payments') || [];

  const addressOptions =
    addresses?.map((address: any) => ({
      label: `${address.name || address.address_name || 'Unnamed Address'}`,
      value: address.id || address.address_id || address.uuid,
    })) || [];

  const paymentOptions =
    payments?.map((payment: any) => ({
      label: `${payment.method || 'Unknown Method'} (${payment.account_name || payment.accountName || 'Unknown Account'})`,
      value: payment.id || payment.payment_id || payment.uuid,
    })) || [];

  const duplicateSite = (index: number) => {
    const currentSite = getValues(`${sectionPrefix}.${index}`);
    if (currentSite) {
      // Remove id to create a new site
      const siteData = { ...currentSite };
      delete siteData.id;
      appendSite(siteData);
    }
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
              label={t('form.fields.amountPercent')}
              placeholder={t('form.fields.amountPercentPlaceholder')}
              type="number"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ControlledDatePickerField
              name={`${sectionPrefix}.${siteIndex}.percentOffInvoice.${invoiceIndex}.start_date`}
              control={control}
              label={t('form.fields.startDate')}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ControlledDatePickerField
              name={`${sectionPrefix}.${siteIndex}.percentOffInvoice.${invoiceIndex}.end_date`}
              control={control}
              label={t('form.fields.endDate')}
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
              label={t('form.fields.siteName')}
              placeholder={t('form.fields.siteNamePlaceholder')}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              variant="outlined"
              required
              name={`${sectionPrefix}.${index}.addressId`}
              control={control}
              label={t('form.fields.address')}
              placeholder={t('form.fields.addressPlaceholder')}
              options={addressOptions}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ControlledCheckBoxField
              control={control}
              name={`${sectionPrefix}.${index}.paymentIds`}
              label={t('form.fields.associatedPayments')}
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
              label={t('form.fields.returnableSupplier')}
              placeholder={t('form.fields.returnableSupplierPlaceholder')}
              options={yesNoOptions}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              variant="outlined"
              required
              name={`${sectionPrefix}.${index}.deliveryMode`}
              control={control}
              label={t('form.fields.deliveryMode')}
              placeholder={t('form.fields.deliveryModePlaceholder')}
              options={deliveryModeOptions}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.${index}.previousTradeNames`}
              control={control}
              label={t('form.fields.previousTradeNames')}
              placeholder={t('form.fields.previousTradeNamesPlaceholder')}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ControlledCheckBoxField
              control={control}
              name={`${sectionPrefix}.${index}.preferredOrderDay`}
              label={t('form.fields.preferredOrderDays')}
              options={dayOptions.map((option) => ({
                ...option,
                label:
                  t(`form.view.${option.value.toLowerCase()}`) || option.label,
              }))}
              columns={4}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ControlledCheckBoxField
              control={control}
              name={`${sectionPrefix}.${index}.preferredDeliveryDay`}
              label={t('form.fields.preferredDeliveryDays')}
              options={dayOptions.map((option) => ({
                ...option,
                label:
                  t(`form.view.${option.value.toLowerCase()}`) || option.label,
              }))}
              columns={4}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.${index}.minOrderValue`}
              control={control}
              label={t('form.fields.minimumOrderValue')}
              placeholder={t('form.fields.minimumOrderValuePlaceholder')}
              type="number"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.${index}.minOrderQty`}
              control={control}
              label={t('form.fields.minimumOrderQuantity')}
              placeholder={t('form.fields.minimumOrderQuantityPlaceholder')}
              type="number"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              variant="outlined"
              required
              name={`${sectionPrefix}.${index}.overReceivingFlag`}
              control={control}
              label={t('form.fields.overReceivingFlag')}
              placeholder={t('form.fields.overReceivingFlagPlaceholder')}
              options={yesNoOptions}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              variant="outlined"
              required
              name={`${sectionPrefix}.${index}.status`}
              control={control}
              label={t('form.fields.status')}
              placeholder={t('form.fields.statusPlaceholder')}
              options={siteStatusOptions}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t('form.fields.percentOffInvoice')}
          </Typography>
          <PercentOffInvoiceList siteIndex={index} />
          {!readOnly && (
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
              {t('form.fields.addPercentOffInvoice')}
            </Button>
          )}
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
                {t('form.fields.duplicateSite')}
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
          title={
            <TextAtom weight={'bold'}>
              {t('form.fields.siteNumber')}
              {index + 1}
            </TextAtom>
          }
        >
          {RenderSiteItem(index)}
        </CollapsibleCard>
      ))}

      {siteFields.length === 0 && (
        <TextAtom variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          {readOnly ? t('form.fields.noSites') : t('form.fields.noSitesAdded')}
        </TextAtom>
      )}

      {!readOnly && (
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addNewSite}
          sx={{ mt: 2 }}
        >
          {t('form.fields.addSite')}
        </Button>
      )}
    </Box>
  );
};

export default SupplierSupplierSiteFields;
