import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('supplier');
  const primaryContactName =
    data.firstName && data.lastName
      ? `${data.salutation || ''} ${data.firstName} ${data.lastName}`.trim()
      : undefined;

  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.primaryContactName')}
          value={primaryContactName}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.primaryContactEmail')}
          value={data.email}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.primaryContactPhone')}
          value={data.phone}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.jobTitle')}
          value={data.jobTitle}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.department')}
          value={data.department}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.secondaryContactName')}
          value={data.secondaryContactName}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.secondaryContactEmail')}
          value={data.secondaryContactEmail}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.secondaryContactPhone')}
          value={data.secondaryContactPhone}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label={t('form.view.website')} value={data.website} />
      </Grid>
    </>
  );
};

export default SupplierContactView;
