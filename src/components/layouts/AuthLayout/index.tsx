import React, { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import { LanguageSwitcher } from '@src/components/molecules';
import {
  StyledAuthWrapper,
  StyledAuthCard,
  StyledLogoImage,
  StyledBrandLogo ,
} from './index.styled';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <StyledAuthWrapper>
      <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 25 }}>
        <LanguageSwitcher />
      </Box>
      <StyledBrandLogo  src='/images/logo-cpaxtra.png' alt="logo" />
      <StyledAuthCard>{children}</StyledAuthCard>
      <StyledLogoImage src="/images/marko-lotus.png" alt="Marko Lotus" />
    </StyledAuthWrapper>
  );
};

export default AuthLayout;
