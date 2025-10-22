import { Grid } from '@mui/material';
import { DataPair } from '@src/components/molecules';
import { SupplierContact } from '@src/types';
import React from 'react';

interface SupplierContactViewProps {
  data: Partial<SupplierContact> & {
    secondaryContactName?: string;
    secondaryContactEmail?: string;
    secondaryContactPhone?: string;
    website?: string;
  };
}

const SupplierContactView: React.FC<SupplierContactViewProps> = ({ data }) => {
  const primaryContactName =
    data.firstName && data.lastName
      ? `${data.salutation || ''} ${data.firstName} ${data.lastName}`.trim()
      : undefined;

  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Primary Contact Name" value={primaryContactName} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Primary Contact Email" value={data.email} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Primary Contact Phone" value={data.phone} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Job Title" value={data.jobTitle} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Department" value={data.department} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="Secondary Contact Name"
          value={data.secondaryContactName}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="Secondary Contact Email"
          value={data.secondaryContactEmail}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="Secondary Contact Phone"
          value={data.secondaryContactPhone}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Website" value={data.website} />
      </Grid>
    </>
  );
};

export default SupplierContactView;
