import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Stack, Box, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ActionButtonsGroup } from '@src/components/molecules';
import { ButtonAtom } from '@src/components/atoms';
import { StepperOrganism } from '@src/components';

export interface StepDefinition {
  label: string;
  Component: React.ComponentType<any>;
  schemaKey: 'information' | 'sites' | null;
}

interface MultiStepFormProps {
  steps: StepDefinition[];
  isLoading?: boolean;
  onSubmit?: () => void | Promise<void>;
  onSaveDraft: () => void | Promise<void>;
}

const STEP_STORAGE_KEY = 'registration-step';

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  isLoading = false,
  onSubmit,
  onSaveDraft,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getInitialStep = () => {
    const savedStep = localStorage.getItem(STEP_STORAGE_KEY);
    if (savedStep) {
      const stepIndex = parseInt(savedStep, 10);
      if (stepIndex >= 0 && stepIndex < steps.length) {
        return stepIndex;
      }
    }
    return 0;
  };

  const [currentStep, setCurrentStep] = useState(getInitialStep);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { formState } = useFormContext();

  // Save step to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STEP_STORAGE_KEY, currentStep.toString());
  }, [currentStep]);

  // Reset terms acceptance when navigating away from the last step
  useEffect(() => {
    if (currentStep !== steps.length - 1) {
      setTermsAccepted(false);
    }
  }, [currentStep, steps.length]);

  const isLastStep = currentStep === steps.length - 1;
  const CurrentStepComponent = steps[currentStep].Component;

  const handleNext = async () => {
    const currentSchemaKey = steps[currentStep].schemaKey;

    if (currentSchemaKey) {
      // NOTE: Remove comment when yup schema validation is implemented
      // const isValid = await trigger();
      // if (!isValid) {
      //   return;
      // }
    }

    const nextStep = Math.min(currentStep + 1, steps.length - 1);
    setCurrentStep(nextStep);
  };

  const handleBack = () => {
    const prevStep = Math.max(currentStep - 1, 0);
    setCurrentStep(prevStep);
  };

  const handleStepClick = (index: number) => {
    if (index < currentStep) {
      setCurrentStep(index);
    }
  };

  const handleTermsAcceptedChange = (accepted: boolean) => {
    setTermsAccepted(accepted);
  };

  return (
    <Stack spacing={isMobile ? 2 : 4}>
      <StepperOrganism
        steps={steps.map(({ label }) => ({ label }))}
        currentStepIndex={currentStep}
        onStepClick={handleStepClick}
        allowBackwardNavigation={true}
        stepIconSize={42}
        orientation="horizontal"
      />

      <Box>
        <CurrentStepComponent
          onTermsAcceptedChange={
            isLastStep ? handleTermsAcceptedChange : undefined
          }
        />
      </Box>

      <Stack
        direction={isMobile ? 'column' : 'row'}
        justifyContent="flex-end"
        spacing={isMobile ? 1 : 2}
        sx={{
          ...(isMobile && {
            position: 'sticky',
            bottom: 0,
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(2),
            borderTop: `1px solid ${theme.palette.divider}`,
            margin: `0 -${theme.spacing(1)}`,
          }),
        }}
      >
        <ActionButtonsGroup>
          {currentStep > 0 && (
            <ButtonAtom
              variant="secondary"
              onClick={handleBack}
              fullWidth={isMobile}
              size={isMobile ? 'medium' : 'large'}
              disabled={isLoading}
            >
              {t('common:registration.back')}
            </ButtonAtom>
          )}

          {!isLastStep && (
            <ButtonAtom
              variant="secondary"
              onClick={onSaveDraft}
              fullWidth={isMobile}
              size={isMobile ? 'medium' : 'large'}
              disabled={isLoading}
            >
              {t('common:registration.saveDraft')}
            </ButtonAtom>
          )}

          {isLastStep ? (
            <ButtonAtom
              variant="primary"
              onClick={onSubmit}
              fullWidth={isMobile}
              size={isMobile ? 'medium' : 'large'}
              disabled={isLoading || formState.isSubmitting || !termsAccepted}
            >
              {t('common:registration.submit')}
            </ButtonAtom>
          ) : (
            <ButtonAtom
              variant="primary"
              onClick={handleNext}
              fullWidth={isMobile}
              size={isMobile ? 'medium' : 'large'}
              disabled={isLoading}
            >
              {t('common:registration.next')}
            </ButtonAtom>
          )}
        </ActionButtonsGroup>
      </Stack>
    </Stack>
  );
};

export default MultiStepForm;
