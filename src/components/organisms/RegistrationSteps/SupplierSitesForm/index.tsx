import { Box } from '@mui/material';
import { FormSectionLayout } from '@src/components/molecules';
import { useFormContext } from 'react-hook-form';
import CompanySupplierSiteFields from '../../CompanyForm/CompanySupplierSiteFields';

interface SupplierSitesFormProps {}

const SupplierSitesForm: React.FC<SupplierSitesFormProps> = () => {
  const sectionPrefix = 'supplierInfo';
  const { control } = useFormContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormSectionLayout title="Sites" subtitle="Supplier Sites Information">
        <CompanySupplierSiteFields
          control={control}
          sectionPrefix={sectionPrefix}
        />
      </FormSectionLayout>
    </Box>
  );
};

export default SupplierSitesForm;
