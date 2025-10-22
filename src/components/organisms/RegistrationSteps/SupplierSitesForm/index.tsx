import { Box } from '@mui/material';
import { FormSectionLayout } from '@src/components/molecules';
import { useFormContext } from 'react-hook-form';
import SupplierSiteFields from '../../SupplierForm/SupplierSiteFields';

interface SupplierSitesFormProps {}

const SupplierSitesForm: React.FC<SupplierSitesFormProps> = () => {
  const sectionPrefix = 'sites';
  const { control } = useFormContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormSectionLayout title="Sites" subtitle="Supplier Sites Information">
        <SupplierSiteFields control={control} sectionPrefix={sectionPrefix} />
      </FormSectionLayout>
    </Box>
  );
};

export default SupplierSitesForm;
