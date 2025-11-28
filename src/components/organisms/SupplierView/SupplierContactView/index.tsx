import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DataPair } from '@src/components/molecules';
import { SupplierContact } from '@src/types';
import React from 'react';

interface SupplierContactViewProps {
  data: Partial<SupplierContact>;
}

const SupplierContactView: React.FC<SupplierContactViewProps> = ({ data }) => {
  const { t } = useTranslation('supplier');
  const isPrimary = data.isPrimary === 'Y';

  const contactName =
    data.firstName && data.lastName
      ? `${data.salutation || ''} ${data.firstName} ${data.lastName}`.trim()
      : undefined;

  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t(
            isPrimary
              ? 'form.view.primaryContactName'
              : 'form.view.contactName',
          )}
          value={contactName}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t(
            isPrimary
              ? 'form.view.primaryContactEmail'
              : 'form.view.contactEmail',
          )}
          value={data.email}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t(
            isPrimary
              ? 'form.view.primaryContactPhone'
              : 'form.view.contactPhone',
          )}
          value={data.phone}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label={t('form.fields.jobTitle')} value={data.jobTitle} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label={t('form.fields.department')} value={data.department} />
      </Grid>
    </>
  );
};

export default SupplierContactView;
