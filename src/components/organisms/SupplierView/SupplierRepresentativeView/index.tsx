import { Grid } from '@mui/material';
import { DataPair } from '@src/components/molecules';
import { SupplierInfo } from '@src/types';
import React from 'react';

interface SupplierRepresentativeViewProps {
  data: Partial<
    Pick<
      SupplierInfo,
      'contactPersonName' | 'contactPersonEmail' | 'contactPersonPhone'
    >
  >;
}

const SupplierRepresentativeView: React.FC<SupplierRepresentativeViewProps> = ({
  data,
}) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Title" value={data.contactPersonName} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Email" value={data.contactPersonEmail} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Phone" value={data.contactPersonPhone} />
      </Grid>
    </>
  );
};

export default SupplierRepresentativeView;
