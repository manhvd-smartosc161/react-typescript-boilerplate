import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid } from '@mui/material';
import {
  ControlledDatePickerField,
  ControlledDropdownField,
  ControlledTextField,
  FormSectionLayout,
} from '@src/components/molecules';
import PICSection from '../../PICSection';
import MultiUploader from '../../MultiUploader';

interface CompanyInfoFormProps {
  isLoading?: boolean;
}

const CompanyInfoForm: React.FC<CompanyInfoFormProps> = ({}) => {
  const sectionPrefix = 'companyInfo';
  const { control } = useFormContext();

  return (
    <FormSectionLayout
      title="Company Information"
      subtitle="General Information"
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.companyNameTh`}
            control={control}
            label="Company Name (Th)"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.companyNameEn`}
            control={control}
            label="Company Name (En)"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.companyAddressTh`}
            control={control}
            label="Company Address (Th)"
            multiline
            rows={3}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            required
            name={`${sectionPrefix}.companyAddressEn`}
            control={control}
            label="Company Address (En)"
            multiline
            rows={3}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            name={`${sectionPrefix}.province`}
            control={control}
            label="Province"
            required
            options={[]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDropdownField
            variant="outlined"
            name={`${sectionPrefix}.zipCode`}
            control={control}
            label="Zip Code"
            required
            options={[]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.companyEmail`}
            control={control}
            label="Company Email"
            type="email"
            required
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.companyWebsite`}
            control={control}
            label="Company Website"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.contactNumber`}
            control={control}
            label="Contact Number"
            required
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.telephoneNumber`}
            control={control}
            label="Telephone Number"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField
            variant="outlined"
            name={`${sectionPrefix}.annualRevenue`}
            control={control}
            label="Annual Revenue (Baht)"
            required
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledDatePickerField
            variant="outlined"
            name={`${sectionPrefix}.establishmentDate`}
            control={control}
            label="Business Establishment Date"
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <ControlledDropdownField
            variant="outlined"
            name={`${sectionPrefix}.taxpayerNumber`}
            control={control}
            label="Taxpayer Number"
            options={[]}
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <MultiUploader
            name={`${sectionPrefix}.companyDocuments`}
            label="Company Documents"
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <PICSection name={`${sectionPrefix}.personsInCharge`} />
        </Grid>
      </Grid>
    </FormSectionLayout>
  );
};

export default CompanyInfoForm;
