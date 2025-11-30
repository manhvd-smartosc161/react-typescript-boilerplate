import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { PageHeaderOrganism, TagAtom } from '@src/components';
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
import { supplierService } from '@src/api/services';
import { currentUserState } from '@src/stores';
import { getErrorMessage } from '@src/errors';

const RegistrationPage = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const currentUser = useRecoilValue(currentUserState);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    mode: 'onChange',
  });

  const { getValues } = formMethods;

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
          try {
            await updateSupplierMutation.mutateAsync({
              id: registrationId,
              data: formData,
            });

            // Refetch supplier data after step 1 update to get latest information
            queryClient.invalidateQueries({
              queryKey: ['supplier', registrationId],
            });
            toast.success('Save draft successfully!');
          } catch (err) {
            toast.error(getErrorMessage(err) || 'Failed to save!');
          }

          break;

        case 1:
          try {
            // Step 2 (Sites Information) - call site update API
            await updateSitesMutation.mutateAsync({
              registrationId,
              sites: formData.sites || [],
            });
            toast.success('Sites updated successfully!');
          } catch (err) {
            toast.error(getErrorMessage(err) || 'Failed to save!');
          }
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

      const formData = getValues();
      console.log('Form submission data:', formData);

      await supplierService.submitSupplier(registrationId);

      // Show success message
      toast.success(
        t('common:registration.submitSuccess') ||
          'Registration submitted successfully!',
      );

      // Mark as submitted and stop loading
      setIsLoadingSubmit(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit registration:', error);
      toast.error(
        t('common:registration.submitError') ||
          'Failed to submit registration. Please try again.',
      );
      setIsLoadingSubmit(false);
    }
  };

  const registrationSteps: StepDefinition[] = [
    {
      label: t('common:registration.steps.companyInformation'),
      Component: SupplierInfoForm,
      schemaKey: 'information',
    },
    {
      label: t('common:registration.steps.sitesInformation'),
      Component: SupplierSitesForm,
      schemaKey: 'sites',
    },
    {
      label: t('common:registration.steps.reviewAndSubmit'),
      Component: ReviewStep,
      schemaKey: null,
    },
  ];

  return (
    <FormProvider {...formMethods}>
      <form id="registration-form" noValidate>
        <RegistrationTemplate
          pageHeader={
            <PageHeaderOrganism
              title={t('common:registration.title')}
              titleSuffix={
                <TagAtom
                  variant="filled"
                  color="primary"
                  children={
                    isLoadingSupplierData
                      ? t('common:registration.loading')
                      : `#${registrationId}`
                  }
                />
              }
              trailing={
                isSubmitted ? (
                  <TagAtom variant="filled" color="waiting">
                    {t('common:status.waitingForApproval')}
                  </TagAtom>
                ) : null
              }
            />
          }
          formContent={
            <MultiStepForm
              steps={registrationSteps}
              isLoading={isLoadingSubmit || isLoadingSupplierData}
              onSubmit={handleFinalSubmit}
              onSaveDraft={handleSaveDraft}
            />
          }
        />
      </form>
    </FormProvider>
  );
};

export default RegistrationPage;
