import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('supplier');

  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label={t('form.view.title')} value={data.contactPersonName} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.email')}
          value={data.contactPersonEmail}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.phone')}
          value={data.contactPersonPhone}
        />
      </Grid>
    </>
  );
};

export default SupplierRepresentativeView;
