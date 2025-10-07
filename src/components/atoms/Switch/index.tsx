import React from 'react';
import { StyledSwitch, StyledSwitchProps } from './index.styled';

const SwitchAtom = (props: StyledSwitchProps) => (
  <StyledSwitch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
);

export default SwitchAtom;
