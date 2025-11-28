import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DataPair } from '@src/components/molecules';
import { SupplierPayment } from '@src/types';
import React from 'react';

interface SupplierPaymentViewProps {
  data: Partial<SupplierPayment>;
}

const SupplierPaymentView: React.FC<SupplierPaymentViewProps> = ({ data }) => {
  const { t } = useTranslation('supplier');

  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.paymentTerms')}
          value={data.paymentTerm}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label={t('form.fields.paymentMethod')} value={data.method} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label={t('form.fields.bankName')} value={data.bankName} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label={t('form.fields.bankBranch')} value={data.bankBranch} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.accountNumber')}
          value={data.accountNumber}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.fields.accountName')}
          value={data.accountName}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label={t('form.fields.currency')} value={data.currency} />
      </Grid>
    </>
  );
};

export default SupplierPaymentView;
