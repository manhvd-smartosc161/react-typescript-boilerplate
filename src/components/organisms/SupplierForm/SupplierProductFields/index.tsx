import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('supplier');

  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.productDivision`}
          control={control}
          label={t('form.fields.productDivision')}
          placeholder={t('form.fields.productDivisionPlaceholder')}
          options={productDivisionOptions}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <ControlledTextField
          variant="outlined"
          name={`${sectionPrefix}.productType`}
          control={control}
          label={t('form.fields.productType')}
          placeholder={t('form.fields.productTypePlaceholder')}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.distributionArea`}
          control={control}
          label={t('form.fields.distributionArea')}
          placeholder={t('form.fields.distributionAreaPlaceholder')}
          options={distributionAreaOptions}
        />
      </Grid>
    </>
  );
};

export default SupplierProductFields;
