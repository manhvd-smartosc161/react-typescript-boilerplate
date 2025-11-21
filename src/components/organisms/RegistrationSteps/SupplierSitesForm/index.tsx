import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormSectionLayout } from '@src/components/molecules';
import { useFormContext } from 'react-hook-form';
import SupplierSiteFields from '../../SupplierForm/SupplierSiteFields';

interface SupplierSitesFormProps {
  readOnly?: boolean;
}

const SupplierSitesForm: React.FC<SupplierSitesFormProps> = ({
  readOnly = false,
}) => {
  const { t } = useTranslation('supplier');
  const sectionPrefix = 'sites';
  const { control } = useFormContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormSectionLayout
        title={t('form.fields.sites')}
        subtitle={t('form.fields.supplierSitesInformation')}
      >
        <SupplierSiteFields
          control={control}
          sectionPrefix={sectionPrefix}
          readOnly={readOnly}
        />
      </FormSectionLayout>
    </Box>
  );
};

export default SupplierSitesForm;
