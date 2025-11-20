import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  ControlledDropdownField,
  ControlledTextField,
} from '@src/components/molecules';
import {
  juristicTypeOptions,
  commercialTaxOptions,
  withholdingTaxOptions,
} from '@src/constants';
import { Control } from 'react-hook-form';

interface SupplierFinancialFieldsProps {
  control: Control<any>;
  sectionPrefix: string;
}

const SupplierFinancialFields: React.FC<SupplierFinancialFieldsProps> = ({
  control,
  sectionPrefix,
}) => {
  const { t } = useTranslation('supplier');

  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.taxId`}
          control={control}
          label={t('form.fields.taxId')}
          placeholder={t('form.fields.taxIdPlaceholder')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.taxType`}
          control={control}
          label={t('form.fields.taxType')}
          placeholder={t('form.fields.taxTypePlaceholder')}
          options={juristicTypeOptions}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.taxCountry`}
          control={control}
          label={t('form.fields.taxCountry')}
          placeholder={t('form.fields.taxCountryPlaceholder')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.commercialTax`}
          control={control}
          label={t('form.fields.commercialTax')}
          placeholder={t('form.fields.commercialTaxPlaceholder')}
          options={commercialTaxOptions}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.withholdingTax`}
          control={control}
          label={t('form.fields.withholdingTax')}
          placeholder={t('form.fields.withholdingTaxPlaceholder')}
          options={withholdingTaxOptions}
        />
      </Grid>
    </>
  );
};

export default SupplierFinancialFields;
