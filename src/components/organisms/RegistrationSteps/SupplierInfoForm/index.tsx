import { Box, Divider } from '@mui/material';
import { FormSectionLayout } from '@src/components/molecules';
import { useFormContext } from 'react-hook-form';
import {
  SupplierGeneralFields,
  SupplierRepresentativeFields,
  SupplierProductFields,
  SupplierFinancialFields,
  SupplierDocumentFields,
  SupplierAddressFields,
  SupplierContactFields,
  SupplierPaymentFields,
} from '../../SupplierForm';

interface SupplierInfoFormProps {}

const SupplierInfoForm: React.FC<SupplierInfoFormProps> = ({}) => {
  const sectionPrefix = 'information';
  const { control } = useFormContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormSectionLayout title="General" subtitle="Basic Information">
        <SupplierGeneralFields
          control={control}
          sectionPrefix={sectionPrefix}
        />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout
        title="Representative"
        subtitle="Representative Information"
      >
        <SupplierRepresentativeFields
          control={control}
          sectionPrefix={sectionPrefix}
        />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout title="Product" subtitle="Product Information">
        <SupplierProductFields
          control={control}
          sectionPrefix={sectionPrefix}
        />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout title="Financial" subtitle="Financial Information">
        <SupplierFinancialFields
          control={control}
          sectionPrefix={sectionPrefix}
        />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout title="Documents" subtitle="Documents Information">
        <SupplierDocumentFields
          control={control}
          sectionPrefix={sectionPrefix}
        />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout title="Address" subtitle="Address Information">
        <SupplierAddressFields
          control={control}
          sectionPrefix={sectionPrefix}
        />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout title="Contacts" subtitle="Contact Information">
        <SupplierContactFields
          control={control}
          sectionPrefix={sectionPrefix}
        />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout title="Payments" subtitle="Payment Information">
        <SupplierPaymentFields
          control={control}
          sectionPrefix={sectionPrefix}
        />
      </FormSectionLayout>

      <Divider />
    </Box>
  );
};

export default SupplierInfoForm;
