import { Grid } from '@mui/material';
import { DataPair } from '@src/components/molecules';
import { SupplierPayment } from '@src/types';
import React from 'react';

interface SupplierPaymentViewProps {
  data: Partial<SupplierPayment> & {
    creditLimit?: number;
  };
}

const SupplierPaymentView: React.FC<SupplierPaymentViewProps> = ({ data }) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Payment Terms" value={data.paymentTerm} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Payment Method" value={data.method} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Bank Name" value={data.bankName} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Bank Branch" value={data.bankBranch} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Account Number" value={data.accountNumber} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Account Name" value={data.accountName} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="Credit Limit"
          value={data.creditLimit?.toLocaleString()}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Currency" value={data.currency} />
      </Grid>
    </>
  );
};

export default SupplierPaymentView;
