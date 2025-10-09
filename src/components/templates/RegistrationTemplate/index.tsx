import React from 'react';
import { Box } from '@mui/material';
import {
  StyledStickyHeader,
  StyledFormContent,
  StyledRegistrationTemplate,
  StyledStickyHeaderContainer,
} from './index.styled';

export interface IRegistrationTemplateProps {
  pageHeader: React.ReactNode;
  stepper?: React.ReactNode;
  formContent: React.ReactNode;
}

export const RegistrationTemplate = ({
  pageHeader,
  stepper,
  formContent,
}: IRegistrationTemplateProps) => {
  return (
    <StyledRegistrationTemplate>
      <StyledStickyHeaderContainer>
        <StyledStickyHeader>
          {pageHeader}
          <Box>{stepper}</Box>
        </StyledStickyHeader>
      </StyledStickyHeaderContainer>
      <StyledFormContent>{formContent}</StyledFormContent>
    </StyledRegistrationTemplate>
  );
};
