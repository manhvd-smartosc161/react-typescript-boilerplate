import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid } from '@mui/material';
import {
  ControlledTextField,
  ControlledDropdownField,
  ControlledDatePickerField,
  FormSectionLayout,
} from '@src/components/molecules';

const CompanyInfoView = () => {
  const { control } = useFormContext();

  return (
    <FormSectionLayout
      title="Company Information"
      subtitle="General Information"
    >
      INfo{' '}
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          name="companyNameTh"
          control={control}
          label="Company Name (Th)"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          name="companyNameEn"
          control={control}
          label="Company Name (En)"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          name="companyAddressTh"
          control={control}
          label="Company Address (Th)"
          multiline
          rows={3}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          name="companyAddressEn"
          control={control}
          label="Company Address (En)"
          multiline
          rows={3}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          name="businessType"
          control={control}
          label="Sample Business"
          options={[]}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          name="addressLine2"
          control={control}
          label="Address Line 2"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          name="province"
          control={control}
          label="Province *"
          options={[]}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          name="zipCode"
          control={control}
          label="Zip Code"
          options={[]}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          name="companyEmail"
          control={control}
          label="Company Email"
          type="email"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          name="companyWebsite"
          control={control}
          label="Company Website"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          name="contactNumber"
          control={control}
          label="Contact Number"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          name="telephoneNumber"
          control={control}
          label="Telephone Number"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          name="annualRevenue"
          control={control}
          label="Annual Revenue (Baht)"
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDatePickerField
          name="establishmentDate"
          control={control}
          label="Business Establishment Date"
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <ControlledDropdownField
          name="taxpayerNumber"
          control={control}
          label="Taxpayer Number"
          options={[]}
        />
      </Grid>
    </FormSectionLayout>
  );
};

export default CompanyInfoView;
