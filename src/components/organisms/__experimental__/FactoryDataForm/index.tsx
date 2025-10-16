import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Box, Grid, Paper } from '@mui/material';
import {
  ControlledCheckBoxField,
  ControlledDatePickerField,
  ControlledDropdownField,
  ControlledRadioField,
  ControlledTextField,
  FormSectionLayout,
} from '@src/components/molecules';
import { FACTORY_DATA_CONST } from '@src/constants';
import { TextAtom } from '@src/components/atoms';

const provinceOptions = [{ value: 'Bangkok', label: 'Bangkok' }];

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
      <Paper variant="outlined" sx={{ p: 2.5 }}>
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
          <Grid size={{ xs: 12 }}>
            <ControlledRadioField
              control={control}
              name={`${sectionPrefix}.licensingStatus`}
              label=""
              options={FACTORY_DATA_CONST.licenseStatusOptions}
            />
          </Grid>

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

          <Grid size={{ xs: 12 }}>
            <Box>
              <TextAtom variant="body1" component="label">
                Factory standards required by law (select at least 1 option) *
              </TextAtom>
              <TextAtom variant="caption" display="block">
                Please have original documents/files ready in case the CP Axtra
                team requests additional information.
              </TextAtom>
            </Box>
            <Box>
              <ControlledCheckBoxField
                control={control}
                columns={2}
                name={`${sectionPrefix}.factoryStandards`}
                options={FACTORY_DATA_CONST.standardOptions}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </FormSectionLayout>
  );
};

export default FactoryDataForm;
