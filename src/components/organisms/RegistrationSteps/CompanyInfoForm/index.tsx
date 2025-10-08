import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, Paper } from '@mui/material';
import {
  ControlledDatePickerField,
  ControlledDropdownField,
  ControlledTextField,
  ControlledAutocompleteField,
  FormSectionLayout,
  ControlledTextAreaField,
} from '@src/components/molecules';
import { THAI_PROVINCES } from '@src/constants';
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
      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              required
              name={`${sectionPrefix}.companyNameTh`}
              control={control}
              label="Company Name (Th)"
              placeholder="Enter company name in Thai"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              required
              name={`${sectionPrefix}.companyNameEn`}
              control={control}
              label="Company Name (En)"
              placeholder="Enter company name in English"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextAreaField
              variant="outlined"
              required
              name={`${sectionPrefix}.companyAddressTh`}
              control={control}
              label="Company Address (Th)"
              placeholder="Enter company address in Thai"
              rows={3}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextAreaField
              variant="outlined"
              required
              name={`${sectionPrefix}.companyAddressEn`}
              control={control}
              label="Company Address (En)"
              placeholder="Enter company address in English"
              rows={3}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledAutocompleteField
              variant="outlined"
              name={`${sectionPrefix}.province`}
              control={control}
              label="Province"
              placeholder="Select province"
              required
              options={THAI_PROVINCES}
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
              placeholder="company@example.com"
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
              placeholder="https://www.example.com"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.contactNumber`}
              control={control}
              label="Contact Number"
              placeholder="e.g. 081-234-5678"
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.telephoneNumber`}
              control={control}
              label="Telephone Number"
              placeholder="e.g. 02-123-4567"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              variant="outlined"
              name={`${sectionPrefix}.annualRevenue`}
              control={control}
              label="Annual Revenue (Baht)"
              placeholder="e.g. 10000000"
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
            <ControlledTextField
              placeholder="e.g. 0105551234567"
              variant="outlined"
              name={`${sectionPrefix}.taxpayerNumber`}
              control={control}
              label="Taxpayer Number"
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <MultiUploader
              name={`${sectionPrefix}.companyRegistrationDocuments`}
              label="Company Documents"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <PICSection name={`${sectionPrefix}.personsInCharge`} />
          </Grid>
        </Grid>
      </Paper>
    </FormSectionLayout>
  );
};

export default CompanyInfoForm;
