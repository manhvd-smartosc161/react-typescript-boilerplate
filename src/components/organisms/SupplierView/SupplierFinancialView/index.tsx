import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DataPair } from '@src/components/molecules';
import { SupplierInfo } from '@src/types';
import React from 'react';

interface SupplierFinancialViewProps {
  data: Partial<Pick<SupplierInfo, 'taxId' | 'taxType' | 'taxCountry'>> & {
    vatRegNo?: string;
    registeredCapital?: number;
    currency?: string;
    annualRevenue?: number;
    bankName?: string;
    bankAccountNo?: string;
    bankAccountName?: string;
    bankBranch?: string;
  };
}

const SupplierFinancialView: React.FC<SupplierFinancialViewProps> = ({
  data,
}) => {
  const { t } = useTranslation('supplier');

  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label={t('form.fields.taxId')} value={data.taxId} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.vatRegistrationNo')}
          value={data.vatRegNo}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.registeredCapital')}
          value={data.registeredCapital?.toLocaleString()}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label={t('form.fields.currency')} value={data.currency} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.annualRevenue')}
          value={data.annualRevenue?.toLocaleString()}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label={t('form.fields.bankName')} value={data.bankName} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.bankAccountNo')}
          value={data.bankAccountNo}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label={t('form.view.bankAccountName')}
          value={data.bankAccountName}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label={t('form.fields.bankBranch')} value={data.bankBranch} />
      </Grid>
    </>
  );
};

export default SupplierFinancialView;
