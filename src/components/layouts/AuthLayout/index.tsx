import React, { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import {
  StyledAuthWrapper,
  StyledAuthCard,
  StyledLogo,
  StyledLogoTitle,
  StyledLogoSubtitle,
  StyledLogoFooter,
} from './index.styled';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({
  children,
  title = '🏢 Smart',
  subtitle = 'Employee Management System',
}) => {
  return (
    <StyledAuthWrapper>
      <StyledAuthCard>
        <StyledLogo>
          <StyledLogoTitle>{title}</StyledLogoTitle>
          <StyledLogoSubtitle>{subtitle}</StyledLogoSubtitle>
          <Box mt={1}>
            <StyledLogoFooter>
              Powered by Recoil State Management
            </StyledLogoFooter>
          </Box>
        </StyledLogo>
        {children}
      </StyledAuthCard>
    </StyledAuthWrapper>
  );
};

export default AuthLayout;
