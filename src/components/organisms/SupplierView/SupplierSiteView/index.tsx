import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DataPair, ReviewOptionList } from '@src/components/molecules';
import { YES_NO_MAP, DELIVERY_MODE_MAP, dayOptions } from '@src/constants';
import { SupplierSite, PercentOffInvoice } from '@src/types';
import React from 'react';

interface SupplierSiteViewProps {
  data: Partial<SupplierSite>;
  addressLabel?: string;
  paymentOptions?: Array<{ label: string; value: string }>;
}

const SupplierSiteView: React.FC<SupplierSiteViewProps> = ({
  data,
  addressLabel,
  paymentOptions = [],
}) => {
  const { t } = useTranslation('supplier');
  const weekDayOptions = dayOptions.map((option) => ({
    ...option,
    label: t(`form.view.${option.value.toLowerCase()}`) || option.label,
  }));

  const renderPercentOffInvoice = (invoices?: PercentOffInvoice[]) => {
    if (!invoices || invoices.length === 0) {
      return (
        <DataPair label="" value={t('form.view.noPercentOffInvoiceEntries')} />
      );
    }

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {invoices.map((invoice, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              border: '1px solid #e0e0e0',
              borderRadius: 1,
            }}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <DataPair
                  label={t('form.view.amount')}
                  value={`${invoice.amount}%`}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <DataPair
                  label={t('form.fields.startDate')}
                  value={invoice.startDate}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <DataPair
                  label={t('form.fields.endDate')}
                  value={invoice.endDate}
                />
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <DataPair label={t('form.fields.siteName')} value={data.name} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DataPair label={t('form.fields.address')} value={addressLabel} />
        </Grid>

        {paymentOptions.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <ReviewOptionList
              label={t('form.fields.associatedPayments')}
              type="checkbox"
              allOptions={paymentOptions}
              selected={data.paymentIds || []}
              columns={3}
            />
          </Grid>
        )}

        <Grid size={{ xs: 12, md: 6 }}>
          <DataPair
            label={t('form.fields.returnableSupplier')}
            value={
              data.returnableSupplier
                ? YES_NO_MAP[data.returnableSupplier]
                : undefined
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DataPair
            label={t('form.fields.deliveryMode')}
            value={
              data.deliveryMode
                ? DELIVERY_MODE_MAP[data.deliveryMode]
                : undefined
            }
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <DataPair
            label={t('form.fields.previousTradeNames')}
            value={data.previousTradeNames}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ReviewOptionList
            label={t('form.fields.preferredOrderDays')}
            type="checkbox"
            allOptions={weekDayOptions}
            selected={data.preferredOrderDay || []}
            columns={4}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ReviewOptionList
            label={t('form.fields.preferredDeliveryDays')}
            type="checkbox"
            allOptions={weekDayOptions}
            selected={data.preferredDeliveryDay || []}
            columns={4}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DataPair
            label={t('form.fields.minimumOrderValue')}
            value={data.minOrderValue?.toLocaleString()}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DataPair
            label={t('form.fields.minimumOrderQuantity')}
            value={data.minOrderQty?.toLocaleString()}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DataPair
            label={t('form.fields.overReceivingFlag')}
            value={
              data.overReceivingFlag
                ? YES_NO_MAP[data.overReceivingFlag]
                : undefined
            }
          />
        </Grid>
      </Grid>

      {/* Percent Off Invoice Section */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('form.fields.percentOffInvoice')}
        </Typography>
        {renderPercentOffInvoice(data.percentOffInvoice)}
      </Box>
    </Box>
  );
};

export default SupplierSiteView;
