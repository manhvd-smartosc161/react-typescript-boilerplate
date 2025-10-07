import React from 'react';
import { StyledRoot } from './index.styled';

export interface ActionButtonsGroupProps {
  children: React.ReactNode;
}

const ActionButtonsGroup = ({ children }: ActionButtonsGroupProps) => {
  return (
    <StyledRoot direction="row" spacing={2}>
      {children}
    </StyledRoot>
  );
};

export default ActionButtonsGroup;
