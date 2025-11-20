import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DataPair } from '@src/components/molecules';
import { SupplierAddress } from '@src/types';
import React from 'react';

interface SupplierAddressViewProps {
  data: Partial<SupplierAddress>;
}

const SupplierAddressView: React.FC<SupplierAddressViewProps> = ({ data }) => {
  const { t } = useTranslation('supplier');

  return (
    <>
      <Grid size={{ xs: 12 }}>
        <DataPair label={t('form.fields.addressLine1')} value={data.line1} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <DataPair label={t('form.fields.addressLine2')} value={data.line2} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label={t('form.fields.city')} value={data.city} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label={t('form.fields.stateProvince')} value={data.state} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label={t('form.fields.postalCode')} value={data.postalCode} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label={t('form.fields.country')} value={data.country} />
      </Grid>
    </>
  );
};

export default SupplierAddressView;
