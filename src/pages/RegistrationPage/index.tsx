import { yupResolver } from '@hookform/resolvers/yup';
import { Path } from 'react-hook-form';
import {
  PageHeader,
  ActionButtonsGroup,
  TagAtom,
  ButtonAtom,
  MultiStepForm,
  FactoryDataView,
  SupplierSitesForm,
  SupplierInfoView,
} from '@src/components';
import RegistrationStepper from '@src/components/organisms/Stepper';

import { RegistrationTemplate } from '@src/components/templates/RegistrationTemplate';
import {
  registrationMasterSchema,
  defaultRegistrationValues,
} from '@src/schemas';
import { RegistrationFormValues } from '@src/types/registration';

import { useState } from 'react';
import { Work } from '@mui/icons-material';
import { SupplierInfoForm } from '@src/components/organisms';

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
      icon: <Work />,
      Form: SupplierInfoForm,
      Review: SupplierInfoView,
      reviewDataPath: 'companyInfo' as keyof RegistrationFormValues,
      fieldsToValidate: [] as Path<RegistrationFormValues>[],
    },
    {
      label: 'Sites Information',
      icon: <Work />,
      Form: SupplierSitesForm,
      Review: FactoryDataView,
      reviewDataPath: 'factoryData' as keyof RegistrationFormValues,
      fieldsToValidate: [],
    },
    {
      label: 'Review and Submit',
      icon: <span>✓</span>,
      Form: () => null,
      Review: () => null,
      fieldsToValidate: [],
    },
  ];

  const stepper = (
    <RegistrationStepper
      steps={steps.map(({ label, icon }) => ({
        label,
        icon,
      }))}
      currentStepIndex={currentStep}
      onStepClick={handleStepClick}
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
        <MultiStepForm<RegistrationFormValues>
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
