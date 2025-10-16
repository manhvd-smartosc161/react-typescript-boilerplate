import { Grid } from '@mui/material';
import {
  ControlledDropdownField,
  ControlledTextField,
} from '@src/components/molecules';
import { Control } from 'react-hook-form';

interface CompanyFinancialFieldsProps {
  control: Control<any>;
  sectionPrefix: string;
}

const CompanyFinancialFields: React.FC<CompanyFinancialFieldsProps> = ({
  control,
  sectionPrefix,
}) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.taxId`}
          control={control}
          label="Tax ID"
          placeholder="Enter tax ID (13 digits)"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.taxType`}
          control={control}
          label="Tax Type"
          placeholder="Select tax type"
          options={[
            { label: 'Corporation', value: 'CORPORATION' },
            { label: 'Individual', value: 'INDIVIDUAL' },
            { label: 'Partnership', value: 'PARTNERSHIP' },
          ]}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.taxCountry`}
          control={control}
          label="Tax Country"
          placeholder="Enter tax country code (e.g., TH)"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.commercialTax`}
          control={control}
          label="Commercial Tax"
          placeholder="Select commercial tax"
          options={[
            { label: 'VAT 7%', value: 'VAT_7' },
            { label: 'VAT 0%', value: 'VAT_0' },
            { label: 'No VAT', value: 'NO_VAT' },
          ]}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.withholdingTax`}
          control={control}
          label="Withholding Tax"
          placeholder="Select withholding tax"
          options={[
            { label: 'Yes', value: 'Y' },
            { label: 'No', value: 'N' },
          ]}
        />
      </Grid>
    </>
  );
};

export default CompanyFinancialFields;
