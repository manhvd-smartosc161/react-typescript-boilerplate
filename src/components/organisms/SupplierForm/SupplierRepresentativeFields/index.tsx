import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ControlledTextField } from '@src/components/molecules';
import { Control } from 'react-hook-form';

interface CompanyRepresentativeProps {
  control: Control<any>;
  sectionPrefix: string;
}

const SupplierRepresentativeFields: React.FC<CompanyRepresentativeProps> = ({
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
          name={`${sectionPrefix}.contactPersonName`}
          control={control}
          label={t('form.fields.contactPersonName')}
          placeholder={t('form.fields.contactPersonNamePlaceholder')}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.contactPersonEmail`}
          control={control}
          label={t('form.fields.contactPersonEmail')}
          placeholder={t('form.fields.contactPersonEmailPlaceholder')}
          type="email"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <ControlledTextField
          variant="outlined"
          required
          name={`${sectionPrefix}.contactPersonPhone`}
          control={control}
          label={t('form.fields.contactPersonPhone')}
          placeholder={t('form.fields.contactPersonPhonePlaceholder')}
        />
      </Grid>
    </>
  );
};

export default SupplierRepresentativeFields;
