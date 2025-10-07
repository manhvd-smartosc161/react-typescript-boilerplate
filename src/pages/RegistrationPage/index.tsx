import { yupResolver } from '@hookform/resolvers/yup';
import { Path } from 'react-hook-form';
import {
  PageHeader,
  ActionButtonsGroup,
  TagAtom,
  ButtonAtom,
  MultiStepForm,
  CompanyInfoForm,
  CompanyInfoView,
  FactoryDataForm,
  FactoryDataView,
  ProductInfoForm,
  ProductInfoView,
} from '@src/components';
import RegistrationStepper from '@src/components/organisms/Stepper';

import { RegistrationTemplate } from '@src/components/templates/RegistrationTemplate';
import { registrationMasterSchema } from '@src/schemas';
import { RegistrationFormValues } from '@src/types/registration';

import { useState } from 'react';

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
      icon: <span>1</span>,
      Form: CompanyInfoForm,
      Review: CompanyInfoView,
      fieldsToValidate: [
        'companyInfo.companyNameTh',
        'companyInfo.companyNameEn',
        'companyInfo.companyAddressTh',
        'companyInfo.companyAddressEn',
        'companyInfo.province',
        'companyInfo.zipCode',
        'companyInfo.companyEmail',
        'companyInfo.contactNumber',
        'companyInfo.annualRevenue',
        'companyInfo.establishmentDate',
        'companyInfo.taxpayerNumber',
      ] as Path<RegistrationFormValues>[],
    },
    {
      label: 'Factory Data',
      icon: <span>2</span>,
      Form: FactoryDataForm,
      Review: FactoryDataView,
      fieldsToValidate: [
        'factoryData.factoryName',
        'factoryData.factoryAddress',
        'factoryData.province',
        'factoryData.zipCode',
        'factoryData.licensingStatus',
        'factoryData.factoryStandards',
      ] as Path<RegistrationFormValues>[],
    },
    {
      label: 'Product Information',
      icon: <span>3</span>,
      Form: ProductInfoForm,
      Review: ProductInfoView,
      fieldsToValidate: [
        'productInfo.productLines',
      ] as Path<RegistrationFormValues>[],
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
          trailingActions={
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
