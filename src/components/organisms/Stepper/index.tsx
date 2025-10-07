import React from 'react';
import { Stack } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import StepperNavItemMolecule, {
  StepStatus,
} from '@src/components/molecules/StepperNavItem';
import { IconAtom } from '@src/components/atoms';

export interface IStepData {
  label: string;
  icon: React.ReactNode;
}

export interface IRegistrationStepperProps {
  steps: IStepData[];
  currentStepIndex: number;
  onStepClick?: (index: number) => void;
}

const RegistrationStepper = ({
  steps,
  currentStepIndex,
  onStepClick,
}: IRegistrationStepperProps) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {steps.map((step, index) => {
        let status: StepStatus = 'locked';
        if (index < currentStepIndex) {
          status = 'complete';
        } else if (index === currentStepIndex) {
          status = 'active';
        }

        return (
          <React.Fragment key={step.label}>
            <StepperNavItemMolecule
              label={step.label}
              icon={step.icon}
              status={status}
              onClick={
                status === 'complete' ? () => onStepClick?.(index) : undefined
              }
            />

            {index < steps.length - 1 && (
              <IconAtom>
                <ChevronRightIcon sx={{ color: 'text.disabled' }} />
              </IconAtom>
            )}
          </React.Fragment>
        );
      })}
    </Stack>
  );
};
export default RegistrationStepper;
