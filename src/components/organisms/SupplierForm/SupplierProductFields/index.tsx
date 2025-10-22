import { Grid } from '@mui/material';
import {
  ControlledDropdownField,
  ControlledTextField,
} from '@src/components/molecules';
import {
  productDivisionOptions,
  distributionAreaOptions,
} from '@src/constants';
import React from 'react';
import { Control } from 'react-hook-form';

interface SupplierProductFieldsProps {
  control: Control<any>;
  sectionPrefix: string;
}

const SupplierProductFields: React.FC<SupplierProductFieldsProps> = ({
  control,
  sectionPrefix,
}) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.productDivision`}
          control={control}
          label="Product Division"
          placeholder="Select product division"
          options={productDivisionOptions}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <ControlledTextField
          variant="outlined"
          name={`${sectionPrefix}.productType`}
          control={control}
          label="Product Type"
          placeholder="Enter product type"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.distributionArea`}
          control={control}
          label="Distribution Area"
          placeholder="Select distribution area"
          options={distributionAreaOptions}
        />
      </Grid>
    </>
  );
};

export default SupplierProductFields;
