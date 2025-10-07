import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Box, Grid, Typography } from '@mui/material';
import {
  ControlledCheckBoxField,
  ControlledDatePickerField,
  ControlledDropdownField,
  ControlledRadioField,
  ControlledTextField,
  FormSectionLayout,
} from '@src/components/molecules';
import {
  StyledFactoryPaper,
  StyledConditionalSection,
  StyledStandardsSection,
  StyledCheckboxContainer,
} from './index.styled';

// Mock data for dropdowns
const provinceOptions = [{ value: 'Bangkok', label: 'Bangkok' }];
const standardOptions = [
  {
    value: 'prod_license_large',
    label: 'Production License No. 2 (for large factories)',
  },
  {
    value: 'prod_license_small',
    label: 'Production License SorBor 1 (for small production locations)',
  },
  {
    value: 'packing_cert',
    label: 'Packing Plant Registration Certificate (DLD)',
  },
  { value: 'slaughterhouse_license', label: 'Slaughterhouse License' },
  {
    value: 'animal_trading_license',
    label: 'Animal carcass trading license application (R 10)',
  },
  { value: 'meat_sale_cert', label: 'Meat Sale Certificate (Rn)' },
  { value: 'vet_drug_cert', label: 'Veterinary drug registration certificate' },
  { value: 'fishing_license', label: 'Fishing Business License (Section 6)' },
  {
    value: 'packing_house_cert',
    label: 'Products pass through a packing house certified by the PPHO',
  },
  { value: 'manufacturing_license', label: 'Manufacturing License' },
  { value: 'gmp_ghp_cert', label: 'GMP or GHP certification standards' },
  {
    value: 'trimming_site_license',
    label: 'Manufacturing and trimming site license',
  },
  { value: 'no_license', label: 'No license/standard' },
  { value: 'animal_feed_reg', label: 'Animal feed registration certificate' },
  { value: 'animal_movement_form', label: 'Animal carcass movement form' },
];

interface FactoryDataFormProps {
  isLoading?: boolean;
}

const FactoryDataForm: React.FC<FactoryDataFormProps> = ({}) => {
  const { control } = useFormContext();
  const sectionPrefix = 'factoryData';

  const licensingStatus = useWatch({
    control,
    name: `${sectionPrefix}.licensingStatus`,
  });

  const isLicensed = licensingStatus === 'licensed';

  return (
    <FormSectionLayout
      title="Factory Information"
      subtitle="General Information"
    >
      <StyledFactoryPaper elevation={0}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <ControlledTextField
              control={control}
              name={`${sectionPrefix}.factoryName`}
              label="Name of factory/production location *"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ControlledTextField
              control={control}
              name={`${sectionPrefix}.factoryAddress`}
              label="Factory address/production location *"
              multiline
              rows={4}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledDropdownField
              control={control}
              name={`${sectionPrefix}.province`}
              label="Province *"
              options={provinceOptions}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              control={control}
              name={`${sectionPrefix}.zipCode`}
              label="Zip code *"
            />
          </Grid>

          {/* --- Conditional Section --- */}
          <StyledConditionalSection size={{ xs: 12 }}>
            <ControlledRadioField
              control={control}
              name={`${sectionPrefix}.licensingStatus`}
              label=""
              options={[
                {
                  value: 'licensed',
                  label:
                    'Have a license (Please specify the factory registration number and the factory license expiration date)',
                },
                { value: 'not_licensed', label: 'Not yet licensed' },
              ]}
            />
          </StyledConditionalSection>

          {isLicensed && (
            <>
              <Grid size={{ xs: 12, md: 6 }}>
                <ControlledTextField
                  control={control}
                  name={`${sectionPrefix}.factoryRegistrationNumber`}
                  label="Factory registration number *"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ControlledDatePickerField
                  control={control}
                  name={`${sectionPrefix}.licenseExpirationDate`}
                  label="License expiration date *"
                />
              </Grid>
            </>
          )}

          <StyledStandardsSection size={{ xs: 12 }}>
            <Box>
              <Typography variant="subtitle1" component="label">
                Factory standards required by law (select at least 1 option) *
              </Typography>
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                Please have original documents/files ready in case the CP Axtra
                team requests additional information.
              </Typography>
            </Box>
            <StyledCheckboxContainer>
              <ControlledCheckBoxField
                control={control}
                columns={2}
                name={`${sectionPrefix}.factoryStandards`}
                options={standardOptions}
              />
            </StyledCheckboxContainer>
          </StyledStandardsSection>
        </Grid>
      </StyledFactoryPaper>
    </FormSectionLayout>
  );
};

export default FactoryDataForm;
