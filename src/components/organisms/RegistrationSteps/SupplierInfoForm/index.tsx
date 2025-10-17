import { Box, Divider } from '@mui/material';
import { FormSectionLayout } from '@src/components/molecules';
import { useFormContext } from 'react-hook-form';
import {
  CompanyGeneralFields,
  CompanyRepresentativeFields,
  CompanyProductFields,
  CompanyFinancialFields,
  CompanyDocumentFields,
  CompanyAddressFields,
  CompanyContactFields,
  CompanyPaymentFields,
} from '../../CompanyForm';

interface SupplierInfoFormProps {}

const SupplierInfoForm: React.FC<SupplierInfoFormProps> = ({}) => {
  const sectionPrefix = 'inforamtion';
  const { control } = useFormContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormSectionLayout title="General" subtitle="Basic Information">
        <CompanyGeneralFields control={control} sectionPrefix={sectionPrefix} />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout
        title="Representative"
        subtitle="Representative Information"
      >
        <CompanyRepresentativeFields
          control={control}
          sectionPrefix={sectionPrefix}
        />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout title="Product" subtitle="Product Information">
        <CompanyProductFields control={control} sectionPrefix={sectionPrefix} />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout title="Financial" subtitle="Financial Information">
        <CompanyFinancialFields
          control={control}
          sectionPrefix={sectionPrefix}
        />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout title="Documents" subtitle="Documents Information">
        <CompanyDocumentFields
          control={control}
          sectionPrefix={sectionPrefix}
        />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout title="Address" subtitle="Address Information">
        <CompanyAddressFields control={control} sectionPrefix={sectionPrefix} />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout title="Contacts" subtitle="Contact Information">
        <CompanyContactFields control={control} sectionPrefix={sectionPrefix} />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout title="Payments" subtitle="Payment Information">
        <CompanyPaymentFields control={control} sectionPrefix={sectionPrefix} />
      </FormSectionLayout>

      <Divider />
    </Box>
  );
};

export default SupplierInfoForm;
