import React from 'react';
import {
  FormProvider,
  useForm,
  FieldValues,
  Resolver,
  DefaultValues,
  Path,
} from 'react-hook-form';
import { Stack, Box } from '@mui/material';
import { ActionButtonsGroup } from '@src/components/molecules';

import { ButtonAtom } from '@src/components/atoms';
import { StyledFormFieldset } from './index.styled';

export interface StepDefinition<T extends FieldValues> {
  label: string;
  icon: React.ReactNode;
  Form: React.FC<{ isLoading?: boolean }>;
  Review: React.FC;
  fieldsToValidate: Path<T>[];
}

interface MultiStepFormProps<T extends FieldValues> {
  formId: string;
  steps: StepDefinition<T>[];
  defaultValues?: DefaultValues<T>;
  isLoading?: boolean;
  currentStep: number;
  onSubmit: (data: T) => Promise<void>;
  resolver: Resolver<T>;
  onStepChange: (step: number) => void;
}

const MultiStepForm = <T extends FieldValues>({
  formId,
  steps,
  defaultValues,
  isLoading = false,
  currentStep,
  onSubmit,
  resolver,
  onStepChange,
}: MultiStepFormProps<T>) => {
  const formMethods = useForm<T>({
    resolver,
    defaultValues,
    mode: 'onSubmit',
  });
  const { handleSubmit, formState } = formMethods;

  const handleNext = async () => {
    // TODO: Uncomment this when validation is implemented.
    // const fieldsToValidate = steps[currentStep].fieldsToValidate as Path<T>[];
    // const isValid = await trigger(fieldsToValidate);
    const isValid = true;

    if (isValid) {
      const nextStep = Math.min(currentStep + 1, steps.length - 1);
      onStepChange(nextStep);
    }
  };

  const handleBack = () => {
    const prevStep = Math.max(currentStep - 1, 0);
    onStepChange(prevStep);
  };

  const isReviewStep = currentStep === steps.length - 1;
  const CurrentStepFormComponent = steps[currentStep].Form;

  return (
    <FormProvider {...formMethods}>
      <form id={formId} onSubmit={handleSubmit(onSubmit)}>
        <StyledFormFieldset disabled={isLoading || formState.isSubmitting}>
          <Stack spacing={4}>
            <Box>
              {isReviewStep ? (
                <Stack spacing={4}>
                  {steps.slice(0, -1).map((step) => (
                    <step.Review key={step.label} />
                  ))}
                </Stack>
              ) : (
                <CurrentStepFormComponent isLoading={isLoading} />
              )}
            </Box>

            <Stack direction="row" justifyContent="flex-end">
              <ActionButtonsGroup>
                {currentStep > 0 && (
                  <ButtonAtom variant="secondary" onClick={handleBack}>
                    Back
                  </ButtonAtom>
                )}

                {!isReviewStep && (
                  <ButtonAtom variant="primary" onClick={handleNext}>
                    Next
                  </ButtonAtom>
                )}
              </ActionButtonsGroup>
            </Stack>
          </Stack>
        </StyledFormFieldset>
      </form>
    </FormProvider>
  );
};

export default MultiStepForm;
