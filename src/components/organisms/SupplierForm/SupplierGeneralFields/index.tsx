import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  ControlledDropdownField,
  ControlledTextField,
} from '@src/components/molecules';
import {
  businessRelationshipOptions,
  supplierTypeOptions,
  supplierTradingTypeOptions,
  smeFlagOptions,
  businessUnitOptions,
  communicationLanguageOptions,
  connectionTypeOptions,
} from '@src/constants';
import { Control } from 'react-hook-form';

interface SupplierGeneralFieldsProps {
  control: Control<any>;
  sectionPrefix: string;
}

const SupplierGeneralFields: React.FC<SupplierGeneralFieldsProps> = ({
  control,
  sectionPrefix,
}) => {
  const { t } = useTranslation('supplier');

  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.nameTh`}
          control={control}
          label={t('form.fields.companyNameThai')}
          placeholder={t('form.fields.companyNameThaiPlaceholder')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.nameEn`}
          control={control}
          label={t('form.fields.companyNameEnglish')}
          placeholder={t('form.fields.companyNameEnglishPlaceholder')}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.businessRelationship`}
          control={control}
          label={t('form.fields.businessRelationship')}
          placeholder={t('form.fields.businessRelationshipPlaceholder')}
          options={businessRelationshipOptions}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.supType`}
          control={control}
          label={t('form.fields.supplierType')}
          placeholder={t('form.fields.supplierTypePlaceholder')}
          options={supplierTypeOptions}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.supTradingType`}
          control={control}
          label={t('form.fields.supplierTradingType')}
          placeholder={t('form.fields.supplierTradingTypePlaceholder')}
          options={supplierTradingTypeOptions}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.smeFlag`}
          control={control}
          label={t('form.fields.smeFlag')}
          placeholder={t('form.fields.smeFlagPlaceholder')}
          options={smeFlagOptions}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.numberOfEmp`}
          control={control}
          label={t('form.fields.numberOfEmployees')}
          placeholder={t('form.fields.numberOfEmployeesPlaceholder')}
          type="number"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          multiple
          name={`${sectionPrefix}.businessUnits`}
          control={control}
          label={t('form.fields.businessUnits')}
          placeholder={t('form.fields.businessUnitsPlaceholder')}
          options={businessUnitOptions}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.commuLanguage`}
          control={control}
          label={t('form.fields.communicationLanguage')}
          placeholder={t('form.fields.communicationLanguagePlaceholder')}
          options={communicationLanguageOptions}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.incorporationCountry`}
          control={control}
          label={t('form.fields.incorporationCountry')}
          placeholder={t('form.fields.incorporationCountryPlaceholder')}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.businessCountry`}
          control={control}
          label={t('form.fields.businessCountry')}
          placeholder={t('form.fields.businessCountryPlaceholder')}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.connectionType`}
          control={control}
          label={t('form.fields.connectionType')}
          placeholder={t('form.fields.connectionTypePlaceholder')}
          options={connectionTypeOptions}
        />
      </Grid>
    </>
  );
};

export default SupplierGeneralFields;
