import React from 'react';
import { IconAtom } from '@src/components/atoms';
import { StyledRoot, StyledIconContainer, StyledLabel } from './index.styled';

/**
 * StepStatus represents the possible states of a stepper navigation item.
 */
export type StepStatus = 'complete' | 'active' | 'locked';

export interface IStepperNavItemMoleculeProps {
  label: string;
  icon: React.ReactNode;
  status?: StepStatus;
  onClick?: () => void;
}

const StepperNavItemMolecule = ({
  label,
  icon,
  status = 'locked',
  onClick,
}: IStepperNavItemMoleculeProps) => {
  const getIconColor = (): string => {
    return status === 'locked' ? 'text.secondary' : 'white';
  };

  const handleClick = () => {
    if (status === 'complete' && onClick) {
      onClick();
    }
  };

  return (
    <StyledRoot $status={status} onClick={handleClick}>
      <StyledIconContainer $status={status}>
        <IconAtom size="small" color={getIconColor()}>
          {icon}
        </IconAtom>
      </StyledIconContainer>
      <StyledLabel $status={status}>{label}</StyledLabel>
    </StyledRoot>
  );
};

export default StepperNavItemMolecule;
