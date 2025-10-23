import React from 'react';
import { StyledLogoContainer, StyledBrandLogo } from './index.styled';

interface LogoAtomProps {
  collapsed?: boolean;
}

const LogoAtom: React.FC<LogoAtomProps> = ({ collapsed = false }) => {
  return (
    <StyledLogoContainer collapsed={collapsed}>
      <StyledBrandLogo src="/images/logo-cpaxtra.png" alt="logo" />
    </StyledLogoContainer>
  );
};

export default LogoAtom;
