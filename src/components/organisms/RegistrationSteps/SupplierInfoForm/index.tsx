import { Box, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
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

interface SupplierInfoFormProps {
  readOnly?: boolean;
}

const SupplierInfoForm: React.FC<SupplierInfoFormProps> = ({ readOnly = false }) => {
  const { t } = useTranslation('supplier');
  const sectionPrefix = 'information';
  const { control } = useFormContext();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormSectionLayout
        title={t('form.sections.general')}
        subtitle={t('form.sections.basicInformation')}
      >
        <SupplierGeneralFields
          control={control}
          sectionPrefix={sectionPrefix}
        />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout
        title={t('form.sections.representative')}
        subtitle={t('form.sections.representativeInformation')}
      >
        <SupplierRepresentativeFields
          control={control}
          sectionPrefix={sectionPrefix}
        />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout
        title={t('form.sections.product')}
        subtitle={t('form.sections.productInformation')}
      >
        <SupplierProductFields
          control={control}
          sectionPrefix={sectionPrefix}
        />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout
        title={t('form.sections.financial')}
        subtitle={t('form.sections.financialInformation')}
      >
        <SupplierFinancialFields
          control={control}
          sectionPrefix={sectionPrefix}
        />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout
        title={t('form.sections.documents')}
        subtitle={t('form.sections.documentsInformation')}
      >
        <SupplierDocumentFields
          control={control}
          sectionPrefix={sectionPrefix}
        />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout
        title={t('form.sections.address')}
        subtitle={t('form.sections.addressInformation')}
      >
        <SupplierAddressFields
          control={control}
          sectionPrefix={sectionPrefix}
          readOnly={readOnly}
        />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout
        title={t('form.sections.contacts')}
        subtitle={t('form.sections.contactInformation')}
      >
        <SupplierContactFields
          control={control}
          sectionPrefix={sectionPrefix}
          readOnly={readOnly}
        />
      </FormSectionLayout>

      <Divider />

      <FormSectionLayout
        title={t('form.sections.payments')}
        subtitle={t('form.sections.paymentInformation')}
      >
        <SupplierPaymentFields
          control={control}
          sectionPrefix={sectionPrefix}
          readOnly={readOnly}
        />
      </FormSectionLayout>

      <Divider />
    </Box>
  );
};

export default SupplierInfoForm;
