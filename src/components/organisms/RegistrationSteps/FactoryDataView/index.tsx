import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Stack, Typography, Divider } from '@mui/material';

const FactoryDataView: React.FC = () => {
  const { getValues } = useFormContext();

  const values = getValues();

  return (
    <Stack spacing={2}>
      <Typography variant="h6" gutterBottom>
        Factory Data
      </Typography>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Factory Name
        </Typography>
        <Typography variant="body1">
          {values.factoryName || 'Not provided'}
        </Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Factory Address
        </Typography>
        <Typography variant="body1">
          {values.factoryAddress || 'Not provided'}
        </Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Factory Capacity
        </Typography>
        <Typography variant="body1">
          {values.factoryCapacity
            ? `${values.factoryCapacity} units`
            : 'Not provided'}
        </Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          Factory Certifications
        </Typography>
        <Typography variant="body1">
          {values.factoryCertifications || 'Not provided'}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default FactoryDataView;
