import React from 'react';
import { Typography, Grid, Box, Link, Stack, Paper } from '@mui/material';
import { RegistrationFormValues } from '@src/types/registration';
import { DataPair, FormSectionLayout } from '@src/components/molecules';
import { TextAtom } from '@src/components/atoms';
import { formatDate } from '@src/utils';
import { formatNumber } from '@src/utils/number';

interface CompanyInfoReviewProps {
  data?: RegistrationFormValues['companyInfo'];
}

const CompanyInfoReview: React.FC<CompanyInfoReviewProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <FormSectionLayout title="Company Information" subtitle="General Info">
      <Paper variant="outlined" sx={{ p: 2.5, width: '100%' }}>
        <Grid container spacing={3} rowSpacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <DataPair
              label="Company Name (English)"
              value={data.companyNameEn}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <DataPair label="Company Name (Thai)" value={data.companyNameTh} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <DataPair
              label="Company Address (English)"
              value={data.companyAddressEn}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DataPair
              label="Company Address (Thai)"
              value={data.companyAddressTh}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <DataPair label="Province" value={data.province} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DataPair label="Zip Code" value={data.zipCode} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <DataPair label="Company Email" value={data.companyEmail} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DataPair
              label="Company Website"
              value={data.companyWebsite || 'Not provided'}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <DataPair label="Contact Number" value={data.contactNumber} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <DataPair label="Telephone Number" value={data.telephoneNumber} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DataPair
              label="Annual Revenue (Baht)"
              value={formatNumber(data.annualRevenue) || 'Not provided'}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <DataPair
              label="Business Establishment Date"
              value={formatDate(data.establishmentDate) || 'Not provided'}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DataPair label="Taxpayer Number" value={data.taxpayerNumber} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            {/* --- Company Documents Section --- */}
            {data.companyRegistrationDocuments &&
              data.companyRegistrationDocuments.length > 0 && (
                <>
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="subtitle1" component="h4" gutterBottom>
                      Company Registration Documents
                    </Typography>
                  </Box>
                  {data.companyRegistrationDocuments.map((docUrl, index) => (
                    <Grid key={index} size={{ xs: 12 }}>
                      <Link
                        href={docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Document {index + 1}
                      </Link>
                    </Grid>
                  ))}
                </>
              )}
          </Grid>

          <Grid size={{ xs: 12 }}>
            {/* --- Persons In Charge Section --- */}
            {data.personsInCharge && data.personsInCharge.length > 0 && (
              <>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle1" component="h4" gutterBottom>
                    Persons In Charge
                  </Typography>
                </Box>
                {data.personsInCharge.map((pic, index) => (
                  <Box key={index} sx={{ mt: 2 }}>
                    <TextAtom variant="body2" sx={{ mb: 1.5 }}>
                      Representative #{index + 1}
                    </TextAtom>

                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Grid size={{ xs: 12, md: 4 }}>
                        <DataPair label="Name" value={pic.name} />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <DataPair label="Email" value={pic.email} />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <DataPair label="Contact" value={pic.contact} />
                      </Grid>
                    </Stack>
                  </Box>
                ))}
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </FormSectionLayout>
  );
};

export default CompanyInfoReview;
