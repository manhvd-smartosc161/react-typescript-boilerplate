import { useState, useEffect, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
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
import {
  useUpdateSupplierMutation,
  useGetSupplierById,
  useCreateSupplierMutation,
} from '@src/hooks';
import { currentUserState } from '@src/stores';

const RegistrationPage = () => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const currentUser = useRecoilValue(currentUserState);
  const updateSupplierMutation = useUpdateSupplierMutation();
  const createSupplierMutation = useCreateSupplierMutation();

  const { data: supplierData, isLoading: isLoadingSupplierData } =
    useGetSupplierById(currentUser?.registrationId);
  const [registrationId, setRegistrationId] = useState<string>('');

  const getRegistrationId = useCallback(async () => {
    if (!currentUser?.registrationId || currentUser?.registrationId === '') {
      const response = await createSupplierMutation.mutateAsync();
      if (response?.id) {
        setRegistrationId(response.id);
      }
    } else {
      setRegistrationId(currentUser.registrationId);
    }
  }, [currentUser?.registrationId]);
  useEffect(() => {
    getRegistrationId();
  }, []);

  const formMethods = useForm<SupplierRegistrationFormValues>({
    resolver: yupResolver(registrationMasterSchema) as any,
    defaultValues: defaultRegistrationValues,
    mode: 'onSubmit',
  });

  const { handleSubmit, getValues } = formMethods;

  useEffect(() => {
    if (supplierData) {
      const formData = {
        information: supplierData.information || {},
        sites: supplierData.sites || [],
      };

      formMethods.reset(formData);
    }
  }, [supplierData, formMethods]);

  const handleSaveDraft = async () => {
    if (!currentUser?.registrationId) {
      return;
    }

    setIsLoadingSubmit(true);
    const formData = getValues();

    await updateSupplierMutation.mutateAsync({
      id: currentUser.registrationId,
      data: formData,
    });

    setIsLoadingSubmit(false);
  };

  const handleFinalSubmit = async (data: SupplierRegistrationFormValues) => {
    try {
      setIsLoadingSubmit(true);

      console.log('Submitting registration...', data);
      // TODO: Implement API call
      // await api.submitRegistration(data);

      // Show success message and redirect
      console.log('Registration submitted successfully');
      // TODO: Navigate to success page
    } catch (error) {
      console.error('Failed to submit registration:', error);
      // TODO: Show error message to user
      setIsLoadingSubmit(false);
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
                  children={
                    isLoadingSupplierData ? 'Loading...' : `#${registrationId}`
                  }
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
              isLoading={isLoadingSubmit || isLoadingSupplierData}
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
