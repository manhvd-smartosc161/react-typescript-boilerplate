import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
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
  useUpdateSitesMutation,
} from '@src/hooks';
import { currentUserState } from '@src/stores';

const RegistrationPage = () => {
  const queryClient = useQueryClient();
  const currentUser = useRecoilValue(currentUserState);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const updateSupplierMutation = useUpdateSupplierMutation();
  const updateSitesMutation = useUpdateSitesMutation();
  const createSupplierMutation = useCreateSupplierMutation();

  const [registrationId, setRegistrationId] = useState<string>('');

  const { data: supplierData, isLoading: isLoadingSupplierData } =
    useGetSupplierById(registrationId);

  useEffect(() => {
    if (!currentUser) return;
    const initRegistration = async () => {
      if (!currentUser.registrationId) {
        const res = await createSupplierMutation.mutateAsync();
        if (res?.id) setRegistrationId(res.id);
      } else {
        setRegistrationId(currentUser.registrationId);
      }
    };
    initRegistration();
  }, [currentUser]);

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
    if (!registrationId) {
      return;
    }

    const savedStep = localStorage.getItem('registration-step');
    const currentStep = savedStep ? parseInt(savedStep, 10) : 0;

    setIsLoadingSubmit(true);
    const formData = getValues();

    try {
      switch (currentStep) {
        case 0:
          // Step 1 (Company Information) - call supplier update API
          await updateSupplierMutation.mutateAsync({
            id: registrationId,
            data: formData,
          });

          // Refetch supplier data after step 1 update to get latest information
          queryClient.invalidateQueries({
            queryKey: ['supplier', registrationId],
          });
          break;

        case 1:
          // Step 2 (Sites Information) - call site update API
          await updateSitesMutation.mutateAsync({
            registrationId,
            sites: formData.sites || [],
          });
          break;

        case 2:
          // Step 3 (Review and Submit) - no save draft action needed
          break;

        default:
          console.warn(`Unknown step: ${currentStep}`);
          break;
      }
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  const handleFinalSubmit = async () => {
    try {
      setIsLoadingSubmit(true);

      // TODO: Implement API call
      // await api.submitRegistration(data);

      // Show success message and redirect
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
