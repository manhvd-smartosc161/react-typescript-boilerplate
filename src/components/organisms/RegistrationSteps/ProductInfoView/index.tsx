import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Stack, Typography, Divider } from '@mui/material';

const ProductInfoView: React.FC = () => {
  const { getValues } = useFormContext();

  const values = getValues();

  return (
    <Stack spacing={2}>
      <Typography variant="h6" gutterBottom>
        Product Information
      </Typography>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Product Name
        </Typography>
        <Typography variant="body1">
          {values.productName || 'Not provided'}
        </Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Product Category
        </Typography>
        <Typography variant="body1">
          {values.productCategory || 'Not provided'}
        </Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Product Description
        </Typography>
        <Typography variant="body1">
          {values.productDescription || 'Not provided'}
        </Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Product Price
        </Typography>
        <Typography variant="body1">
          {values.productPrice ? `$${values.productPrice}` : 'Not provided'}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ProductInfoView;
