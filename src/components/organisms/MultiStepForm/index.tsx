import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Stack, Box, useMediaQuery, useTheme } from '@mui/material';
import { ActionButtonsGroup } from '@src/components/molecules';
import { ButtonAtom } from '@src/components/atoms';
import { StepperOrganism } from '@src/components';

export interface StepDefinition {
  label: string;
  Component: React.FC;
  schemaKey: 'information' | 'sites' | null;
}

interface MultiStepFormProps {
  steps: StepDefinition[];
  isLoading?: boolean;
  onSubmit: () => void | Promise<void>;
  onSaveDraft: () => void | Promise<void>;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  isLoading = false,
  onSubmit,
  onSaveDraft,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentStep, setCurrentStep] = useState(0);
  const { formState } = useFormContext();

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

    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleStepClick = (index: number) => {
    if (index < currentStep) {
      setCurrentStep(index);
    }
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
        <CurrentStepComponent />
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
              Back
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
              Save Draft
            </ButtonAtom>
          )}

          {isLastStep ? (
            <ButtonAtom
              variant="primary"
              onClick={onSubmit}
              fullWidth={isMobile}
              size={isMobile ? 'medium' : 'large'}
              disabled={isLoading || formState.isSubmitting}
            >
              Submit
            </ButtonAtom>
          ) : (
            <ButtonAtom
              variant="primary"
              onClick={handleNext}
              fullWidth={isMobile}
              size={isMobile ? 'medium' : 'large'}
              disabled={isLoading}
            >
              Next
            </ButtonAtom>
          )}
        </ActionButtonsGroup>
      </Stack>
    </Stack>
  );
};

export default MultiStepForm;
