import { Stepper, Step } from '@mui/material';
import { StepButtonMolecule, StepConnectorAtom } from '@src/components';

export interface IStepData {
  label: string;
  icon?: React.ReactNode;
}

export interface IStepperProps {
  steps: IStepData[];
  currentStepIndex: number;
  onStepClick?: (index: number) => void;
  allowBackwardNavigation?: boolean;
  stepIconSize?: number;
  orientation?: 'horizontal' | 'vertical';
}

const StepperOrganism = ({
  steps,
  currentStepIndex,
  onStepClick,
  allowBackwardNavigation = true,
  stepIconSize = 42,
  orientation = 'horizontal',
}: IStepperProps) => {
  const handleStepClick = (stepIndex: number) => {
    if (allowBackwardNavigation) {
      // Allow clicking on any step up to current step
      if (stepIndex <= currentStepIndex) {
        onStepClick?.(stepIndex);
      }
      return;
    }

    // Only allow clicking on the current step
    if (stepIndex === currentStepIndex) {
      onStepClick?.(stepIndex);
    }
  };

  const isStepDisabled = (stepIndex: number) => {
    if (allowBackwardNavigation) {
      return stepIndex > currentStepIndex;
    }
    return stepIndex !== currentStepIndex;
  };

  return (
    <Stepper
      alternativeLabel
      activeStep={currentStepIndex}
      connector={<StepConnectorAtom />}
      orientation={orientation}
    >
      {steps.map((step, index) => (
        <Step key={step.label} completed={index < currentStepIndex}>
          <StepButtonMolecule
            label={step.label}
            icon={step.icon || index + 1}
            active={index === currentStepIndex}
            completed={index < currentStepIndex}
            disabled={isStepDisabled(index)}
            onClick={() => handleStepClick(index)}
            size={stepIconSize}
          />
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperOrganism;
