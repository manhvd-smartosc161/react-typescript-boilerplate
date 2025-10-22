import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import {
  PageHeader,
  ActionButtonsGroup,
  TagAtom,
  ButtonAtom,
} from '@src/components';
import MultiStepForm, {
  StepDefinition,
} from '@src/components/organisms/MultiStepForm';
import {
  ReviewStep,
  SupplierInfoForm,
  SupplierSitesForm,
} from '@src/components/organisms';
import { RegistrationTemplate } from '@src/components/templates/RegistrationTemplate';
import {
  registrationMasterSchema,
  defaultRegistrationValues,
} from '@src/schemas';
import { SupplierRegistrationFormValues } from '@src/types/supplier';

const RegistrationPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formMethods = useForm<SupplierRegistrationFormValues>({
    resolver: yupResolver(registrationMasterSchema) as any,
    defaultValues: defaultRegistrationValues,
    mode: 'onSubmit',
  });

  const { handleSubmit, getValues } = formMethods;

  const handleSaveDraft = async () => {
    try {
      setIsLoading(true);
      const formData = getValues();

      console.log('Saving draft...', formData);
      // TODO: Implement API call
      // await api.saveRegistrationDraft(formData);

      // Show success message
      console.log('Draft saved successfully');
    } catch (error) {
      console.error('Failed to save draft:', error);
      // TODO: Show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalSubmit = async (data: SupplierRegistrationFormValues) => {
    try {
      setIsLoading(true);

      console.log('Submitting registration...', data);
      // TODO: Implement API call
      // await api.submitRegistration(data);

      // Show success message and redirect
      console.log('Registration submitted successfully');
      // TODO: Navigate to success page
    } catch (error) {
      console.error('Failed to submit registration:', error);
      // TODO: Show error message to user
      setIsLoading(false);
    }
  };

  const registrationSteps: StepDefinition[] = [
    {
      label: 'Company Information',
      Component: SupplierInfoForm,
      schemaKey: 'information',
    },
    {
      label: 'Sites Information',
      Component: SupplierSitesForm,
      schemaKey: 'sites',
    },
    {
      label: 'Review and Submit',
      Component: ReviewStep,
      schemaKey: null,
    },
  ];

  return (
    <FormProvider {...formMethods}>
      <form
        id="registration-form"
        onSubmit={handleSubmit(handleFinalSubmit)}
        noValidate
      >
        <RegistrationTemplate
          pageHeader={
            <PageHeader
              title="Registration"
              titleSuffix={
                <TagAtom
                  variant="filled"
                  color="primary"
                  children={'#586789963'}
                />
              }
              trailing={
                <ActionButtonsGroup>
                  <ButtonAtom variant="secondary">Cancel</ButtonAtom>
                </ActionButtonsGroup>
              }
            />
          }
          formContent={
            <MultiStepForm
              steps={registrationSteps}
              isLoading={isLoading}
              onSubmit={handleSubmit(handleFinalSubmit)}
              onSaveDraft={handleSaveDraft}
            />
          }
        />
      </form>
    </FormProvider>
  );
};

export default RegistrationPage;
