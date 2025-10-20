import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Path } from 'react-hook-form';
import {
  PageHeader,
  ActionButtonsGroup,
  TagAtom,
  ButtonAtom,
  MultiStepForm,
  SupplierSitesForm,
  SupplierInfoView,
} from '@src/components';
import { StepperOrganism } from '@src/components';
import { RegistrationTemplate } from '@src/components/templates/RegistrationTemplate';
import {
  registrationMasterSchema,
  defaultRegistrationValues,
} from '@src/schemas';
import { SupplierRegistrationFormValues } from '@src/types/supplier';
import { SupplierInfoForm, SupplierSitesView } from '@src/components/organisms';

const RegistrationPage = () => {
  const [isLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleSubmit = async () => {};

  const handleStepClick = (index: number) => {
    if (index < currentStep) {
      setCurrentStep(index);
    }
  };

  const steps = [
    {
      label: 'Company Information',
      Form: SupplierInfoForm,
      Review: SupplierInfoView,
      reviewDataPath: 'information' as keyof SupplierRegistrationFormValues,
      fieldsToValidate: [] as Path<SupplierRegistrationFormValues>[],
    },
    {
      label: 'Sites Information',
      Form: SupplierSitesForm,
      Review: SupplierSitesView,
      reviewDataPath: 'sites' as keyof SupplierRegistrationFormValues,
      fieldsToValidate: [],
    },
    {
      label: 'Review and Submit',
      Form: () => null,
      Review: () => null,
      fieldsToValidate: [],
    },
  ];

  const stepper = (
    <StepperOrganism
      steps={steps.map(({ label }) => ({
        label,
      }))}
      currentStepIndex={currentStep}
      onStepClick={handleStepClick}
      allowBackwardNavigation={true}
      stepIconSize={42}
      orientation="horizontal"
    />
  );

  return (
    <RegistrationTemplate
      pageHeader={
        <PageHeader
          title="Registration"
          titleSuffix={
            <TagAtom variant="filled" color="primary" children={'#586789963'} />
          }
          trailing={
            <ActionButtonsGroup>
              <ButtonAtom variant="secondary"> Cancel </ButtonAtom>
              <ButtonAtom variant="primary"> Save </ButtonAtom>
            </ActionButtonsGroup>
          }
        />
      }
      stepper={stepper}
      formContent={
        <MultiStepForm<SupplierRegistrationFormValues>
          formId="registration-form"
          steps={steps}
          defaultValues={defaultRegistrationValues}
          onSubmit={handleSubmit}
          resolver={yupResolver(registrationMasterSchema) as any}
          isLoading={isLoading}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      }
    />
  );
};

export default RegistrationPage;
