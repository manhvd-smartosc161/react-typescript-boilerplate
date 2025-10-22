import { Grid } from '@mui/material';
import {
  ControlledDropdownField,
  ControlledTextField,
} from '@src/components/molecules';
import {
  juristicTypeOptions,
  commercialTaxOptions,
  withholdingTaxOptions,
} from '@src/constants';
import { Control } from 'react-hook-form';

interface SupplierFinancialFieldsProps {
  control: Control<any>;
  sectionPrefix: string;
}

const SupplierFinancialFields: React.FC<SupplierFinancialFieldsProps> = ({
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
          options={juristicTypeOptions}
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
          options={commercialTaxOptions}
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
          options={withholdingTaxOptions}
        />
      </Grid>
    </>
  );
};

export default SupplierFinancialFields;
