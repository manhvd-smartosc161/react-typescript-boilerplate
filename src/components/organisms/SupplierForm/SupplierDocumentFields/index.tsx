import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ControlledDropdownField } from '@src/components/molecules';
import { Control } from 'react-hook-form';

interface SupplierDocumentFieldsProps {
  control: Control<any>;
  sectionPrefix: string;
}
const SupplierDocumentFields: React.FC<SupplierDocumentFieldsProps> = ({
  control,
  sectionPrefix,
}) => {
  const { t } = useTranslation('supplier');

  return (
    <>
      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.documentQuality`}
          control={control}
          label={t('form.fields.documentQuality')}
          placeholder={t('form.fields.documentQualityPlaceholder')}
          options={[
            { label: 'Yes', value: 'Y' },
            { label: 'No', value: 'N' },
          ]}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <ControlledDropdownField
          variant="outlined"
          required
          name={`${sectionPrefix}.juristicType`}
          control={control}
          label={t('form.fields.juristicType')}
          placeholder={t('form.fields.juristicTypePlaceholder')}
          options={[
            { label: 'Individual', value: 'INDIVIDUAL' },
            { label: 'Company', value: 'COMPANY' },
            { label: 'Partnership', value: 'PARTNERSHIP' },
          ]}
        />
      </Grid>
      {/* <Grid size={{ xs: 12 }}>
        <InputLabelAtom color="default">
          Company Registration Documents
        </InputLabelAtom>

        <MultiUploader
          name={`${sectionPrefix}.companyRegistrationDocuments`}
          label="Company Registration Documents"
        />
      </Grid> */}
    </>
  );
};

export default SupplierDocumentFields;
