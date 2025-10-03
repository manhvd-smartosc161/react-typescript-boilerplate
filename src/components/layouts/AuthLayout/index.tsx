import React, { FC, ReactNode } from 'react';
import {
  StyledAuthWrapper,
  StyledAuthCard,
  StyledLogoImage,
} from './index.styled';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <StyledAuthWrapper>
      <StyledAuthCard>{children}</StyledAuthCard>
      <StyledLogoImage src="/images/marko-lotus.png" alt="Marko Lotus" />
    </StyledAuthWrapper>
  );
};

export default AuthLayout;
