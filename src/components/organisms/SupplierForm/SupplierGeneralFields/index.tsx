import { Grid } from '@mui/material';
import {
  ControlledDropdownField,
  ControlledTextField,
} from '@src/components/molecules';
import {
  businessRelationshipOptions,
  supplierTypeOptions,
  supplierTradingTypeOptions,
  smeFlagOptions,
  businessUnitOptions,
  communicationLanguageOptions,
  connectionTypeOptions,
} from '@src/constants';
import { Control } from 'react-hook-form';

interface SupplierGeneralFieldsProps {
  control: Control<any>;
  sectionPrefix: string;
}

const SupplierGeneralFields: React.FC<SupplierGeneralFieldsProps> = ({
  control,
  sectionPrefix,
}) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.nameTh`}
          control={control}
          label="Company Name (Thai)"
          placeholder="Enter company name in Thai"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.nameEn`}
          control={control}
          label="Company Name (English)"
          placeholder="Enter company name in English"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.businessRelationship`}
          control={control}
          label="Business Relationship"
          placeholder="Select relationship"
          options={businessRelationshipOptions}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.supType`}
          control={control}
          label="Supplier Type"
          placeholder="Select supplier type"
          options={supplierTypeOptions}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.supTradingType`}
          control={control}
          label="Supplier Trading Type"
          placeholder="Select trading type"
          options={supplierTradingTypeOptions}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.smeFlag`}
          control={control}
          label="SME Flag"
          placeholder="Select SME status"
          options={smeFlagOptions}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.numberOfEmp`}
          control={control}
          label="Number of Employees"
          placeholder="Enter number of employees"
          type="number"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          multiple
          name={`${sectionPrefix}.businessUnits`}
          control={control}
          label="Business Units"
          placeholder="Select business units"
          options={businessUnitOptions}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.commuLanguage`}
          control={control}
          label="Communication Language"
          placeholder="Select language"
          options={communicationLanguageOptions}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.incorporationCountry`}
          control={control}
          label="Incorporation Country"
          placeholder="Enter country code (e.g., TH)"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.businessCountry`}
          control={control}
          label="Business Country"
          placeholder="Enter country code (e.g., TH)"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.connectionType`}
          control={control}
          label="Connection Type"
          placeholder="Select connection type"
          options={connectionTypeOptions}
        />
      </Grid>
    </>
  );
};

export default SupplierGeneralFields;
