import React from 'react';
import { StyledRoot, StyledIconContainer, StyledLabel } from './index.styled';

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
  // TODO: Needs update when the icon component is ready
  // const getIconColor = (): string => {
  //   return status === 'locked' ? 'text.secondary' : 'white';
  // };

  const handleClick = () => {
    if (status === 'complete' && onClick) {
      onClick();
    }
  };

  return (
    <StyledRoot $status={status} onClick={handleClick}>
      <StyledIconContainer $status={status}>{icon}</StyledIconContainer>
      <StyledLabel $status={status}>{label}</StyledLabel>
    </StyledRoot>
  );
};

export default StepperNavItemMolecule;
