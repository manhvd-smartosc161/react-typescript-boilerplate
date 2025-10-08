import React from 'react';
import { Paper, Typography, Grid, Box, Stack } from '@mui/material';
import {
  CheckBox as CheckboxCheckedIcon,
  CheckBoxOutlineBlank as CheckboxUncheckedIcon,
} from '@mui/icons-material';
import { RegistrationFormValues } from '@src/types/registration';
import { DataPair, FormSectionLayout } from '@src/components/molecules';

const capitalize = (s: string | null | undefined) => {
  if (!s) return null;
  return s.charAt(0).toUpperCase() + s.slice(1);
};

interface ProductInfoReviewProps {
  data?: RegistrationFormValues['productInfo'];
}

const ProductInfoReview: React.FC<ProductInfoReviewProps> = ({ data }) => {
  if (!data || !data.productLines || data.productLines.length === 0) {
    return null;
  }

  // TODO: Need Refactor
  const SoldAtDisplay = ({
    soldAt,
  }: {
    soldAt: { makro?: boolean; lotus?: boolean };
  }) => (
    <Stack direction="row" spacing={3} alignItems="center">
      <Stack direction="row" alignItems="center" spacing={0.5}>
        {soldAt?.makro ? (
          <CheckboxCheckedIcon color="primary" />
        ) : (
          <CheckboxUncheckedIcon color="disabled" />
        )}
        <Typography variant="body2">Sale at Makro</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        {soldAt?.lotus ? (
          <CheckboxCheckedIcon color="primary" />
        ) : (
          <CheckboxUncheckedIcon color="disabled" />
        )}
        <Typography variant="body2">Sale at Lotus's</Typography>
      </Stack>
    </Stack>
  );

  // TODO: Need Refactor
  const ImagePreview = ({
    label,
    file,
  }: {
    label: string;
    file: File | string | null;
  }) => (
    <Box textAlign="center">
      {file ? (
        <img
          src={typeof file === 'string' ? file : URL.createObjectURL(file)}
          alt={label}
          style={{
            width: '100%',
            height: '120px',
            objectFit: 'contain',
            borderRadius: '4px',
            border: '1px solid #eee',
          }}
          onLoad={(e) => {
            if (typeof file !== 'string')
              URL.revokeObjectURL(e.currentTarget.src);
          }}
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '120px',
            bgcolor: 'grey.100',
            borderRadius: '4px',
          }}
        />
      )}
      <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
        {label}
      </Typography>
    </Box>
  );

  return (
    <FormSectionLayout title={'Product Details'} subtitle="General Information">
      <Stack spacing={4}>
        {data.productLines.map((product, index) => (
          <Paper key={index} variant="outlined" sx={{ p: 2.5 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">Product Line #{index + 1}</Typography>
              <SoldAtDisplay soldAt={product.soldAt} />
            </Stack>

            <Grid container spacing={3} rowSpacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <DataPair
                  label="Product/Brand Name (English)"
                  value={product.brandNameEn}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DataPair
                  label="Product/Brand Name (Thai)"
                  value={product.brandNameTh}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DataPair
                  label="Product Category"
                  value={product.productCategory}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DataPair
                  label="Product Subcategory"
                  value={product.productSubcategory}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DataPair label="SKU Count" value={product.skuCount} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DataPair
                  label="Willingness to Offer Exclusivity"
                  value={capitalize(product.offerExclusivity)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DataPair
                  label="Target Customer Type"
                  value={product.targetCustomerType}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DataPair
                  label="Available Channels"
                  value={product.availableChannels?.join(', ')}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DataPair label="USP / Differentiators" value={product.usp} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DataPair
                  label="Currently Sold In"
                  value={product.currentlySoldIn}
                />
              </Grid>

              <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Product Images
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <ImagePreview
                      label="Packaging (Front)"
                      file={product.images?.packagingFront}
                    />
                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <ImagePreview
                      label="Behind"
                      file={product.images?.packagingBehind}
                    />
                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <ImagePreview
                      label="Side"
                      file={product.images?.packagingSide}
                    />
                  </Grid>
                  <Grid size={{ xs: 6, md: 3 }}>
                    <ImagePreview
                      label="Other Aspects"
                      file={product.images?.otherAspects}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Stack>
    </FormSectionLayout>
  );
};

export default ProductInfoReview;
