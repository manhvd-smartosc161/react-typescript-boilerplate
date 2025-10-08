import React from 'react';
import { Grid, Paper } from '@mui/material';
import { RegistrationFormValues } from '@src/types/registration';
import {
  DataPair,
  FormSectionLayout,
  ReviewOptionList,
} from '@src/components/molecules';
import { formatDate } from '@src/utils';
import { FACTORY_DATA_CONST } from '@src/constants';

interface FactoryDataReviewProps {
  data?: RegistrationFormValues['factoryData'];
}

const FactoryDataView: React.FC<FactoryDataReviewProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const isLicensed = data.licensingStatus === 'licensed';

  return (
    <FormSectionLayout
      title="Factory Information"
      subtitle="General Information"
    >
      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Grid container spacing={3} rowSpacing={3}>
          <Grid size={{ xs: 12 }}>
            <DataPair
              label="Name of factory/production location"
              value={data.factoryName}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <DataPair
              label="Factory address/production location"
              value={data.factoryAddress}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DataPair label="Province" value={data.province} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DataPair label="Zip code" value={data.zipCode} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ReviewOptionList
              label="License Status"
              type="radio"
              allOptions={FACTORY_DATA_CONST.licenseStatusOptions}
              selected={data.licensingStatus}
            />
          </Grid>

          {isLicensed && (
            <>
              <Grid size={{ xs: 12, md: 6 }}>
                <DataPair
                  label="Factory registration number"
                  value={data.factoryRegistrationNumber}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DataPair
                  label="License expiration date"
                  value={
                    formatDate(data.licenseExpirationDate) || 'Not provided'
                  }
                />
              </Grid>
            </>
          )}

          <Grid size={{ xs: 12 }} sx={{ mt: 1 }}>
            <ReviewOptionList
              label="Factory standards required by law"
              type="checkbox"
              allOptions={FACTORY_DATA_CONST.standardOptions}
              selected={data.factoryStandards}
              columns={2}
            />
          </Grid>
        </Grid>
      </Paper>
    </FormSectionLayout>
  );
};

export default FactoryDataView;
