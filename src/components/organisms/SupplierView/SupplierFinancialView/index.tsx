import { Grid } from '@mui/material';
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
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Tax ID" value={data.taxId} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="VAT Registration No." value={data.vatRegNo} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="Registered Capital"
          value={data.registeredCapital?.toLocaleString()}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Currency" value={data.currency} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair
          label="Annual Revenue"
          value={data.annualRevenue?.toLocaleString()}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Bank Name" value={data.bankName} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Bank Account No." value={data.bankAccountNo} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Bank Account Name" value={data.bankAccountName} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <DataPair label="Bank Branch" value={data.bankBranch} />
      </Grid>
    </>
  );
};

export default SupplierFinancialView;
