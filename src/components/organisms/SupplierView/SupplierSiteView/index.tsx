import { Box, Grid, Typography } from '@mui/material';
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
  const weekDayOptions = dayOptions;

  const renderPercentOffInvoice = (invoices?: PercentOffInvoice[]) => {
    if (!invoices || invoices.length === 0) {
      return <DataPair label="" value="No percent off invoice entries" />;
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
                <DataPair label="Amount" value={`${invoice.amount}%`} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <DataPair label="Start Date" value={invoice.startDate} />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <DataPair label="End Date" value={invoice.endDate} />
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
          <DataPair label="Site Name" value={data.name} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DataPair label="Address" value={addressLabel} />
        </Grid>

        {paymentOptions.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <ReviewOptionList
              label="Associated Payments"
              type="checkbox"
              allOptions={paymentOptions}
              selected={data.paymentIds || []}
              columns={3}
            />
          </Grid>
        )}

        <Grid size={{ xs: 12, md: 6 }}>
          <DataPair
            label="Returnable Supplier"
            value={
              data.returnableSupplier
                ? YES_NO_MAP[data.returnableSupplier]
                : undefined
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DataPair
            label="Delivery Mode"
            value={
              data.deliveryMode
                ? DELIVERY_MODE_MAP[data.deliveryMode]
                : undefined
            }
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <DataPair
            label="Previous Trade Names"
            value={data.previousTradeNames}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ReviewOptionList
            label="Preferred Order Days"
            type="checkbox"
            allOptions={weekDayOptions}
            selected={data.preferredOrderDay || []}
            columns={4}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ReviewOptionList
            label="Preferred Delivery Days"
            type="checkbox"
            allOptions={weekDayOptions}
            selected={data.preferredDeliveryDay || []}
            columns={4}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DataPair
            label="Minimum Order Value"
            value={data.minOrderValue?.toLocaleString()}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DataPair
            label="Minimum Order Quantity"
            value={data.minOrderQty?.toLocaleString()}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DataPair
            label="Over Receiving Flag"
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
          Percent Off Invoice
        </Typography>
        {renderPercentOffInvoice(data.percentOffInvoice)}
      </Box>
    </Box>
  );
};

export default SupplierSiteView;
