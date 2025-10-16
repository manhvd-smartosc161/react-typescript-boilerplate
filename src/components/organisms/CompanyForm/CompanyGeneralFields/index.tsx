import { Grid } from '@mui/material';
import {
  ControlledAutocompleteField,
  ControlledDropdownField,
  ControlledTextField,
} from '@src/components/molecules';
import { Control } from 'react-hook-form';

interface CompanyGeneralFieldsProps {
  control: Control<any>;
  sectionPrefix: string;
}

const CompanyGeneralFields: React.FC<CompanyGeneralFieldsProps> = ({
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
          options={[
            { label: 'Prospective', value: 'PROSPECTIVE' },
            { label: 'Active', value: 'ACTIVE' },
            { label: 'Inactive', value: 'INACTIVE' },
          ]}
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
          options={[
            { label: 'Branded', value: 'BRANDED' },
            { label: 'Non-Branded', value: 'NON_BRANDED' },
            { label: 'Service', value: 'SERVICE' },
          ]}
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
          options={[
            { label: 'Branded Credit', value: 'BRANDED_CREDIT' },
            { label: 'Branded Cash', value: 'BRANDED_CASH' },
            { label: 'Consignment', value: 'CONSIGNMENT' },
          ]}
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
          options={[
            { label: 'Yes', value: 'Y' },
            { label: 'No', value: 'N' },
          ]}
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
        <ControlledAutocompleteField
          variant="outlined"
          required
          name={`${sectionPrefix}.businessUnits`}
          control={control}
          label="Business Units"
          placeholder="Select business units"
          options={[
            { label: 'Lotus', id: 'LOTUS' },
            { label: 'Makro', id: 'MAKRO' },
          ]}
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
          options={[
            { label: 'English', value: 'EN' },
            { label: 'Thai', value: 'TH' },
          ]}
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
          options={[
            { label: 'Normal', value: 'NORMAL' },
            { label: 'Related Party', value: 'RELATED_PARTY' },
          ]}
        />
      </Grid>
    </>
  );
};

export default CompanyGeneralFields;
