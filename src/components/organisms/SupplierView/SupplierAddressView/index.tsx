import { Grid } from '@mui/material';
import { DataPair } from '@src/components/molecules';
import { SupplierAddress } from '@src/types';
import React from 'react';

interface SupplierAddressViewProps {
  data: Partial<SupplierAddress>;
}

const SupplierAddressView: React.FC<SupplierAddressViewProps> = ({ data }) => {
  return (
    <>
      <Grid size={{ xs: 12 }}>
        <DataPair label="Address Line 1" value={data.line1} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <DataPair label="Address Line 2" value={data.line2} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="City" value={data.city} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="State/Province" value={data.state} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Postal Code" value={data.postalCode} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Country" value={data.country} />
      </Grid>
    </>
  );
};

export default SupplierAddressView;
