import React from 'react';
import { Box } from '@mui/material';
import {
  StyledStickyHeader,
  StyledFormContent,
  StyledRegistrationTemplate,
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
    <StyledRegistrationTemplate spacing={3}>
      <StyledStickyHeader>
        {pageHeader}
        {stepper && <Box sx={{ mt: 2 }}>{stepper}</Box>}
      </StyledStickyHeader>
      <StyledFormContent>{formContent}</StyledFormContent>
    </StyledRegistrationTemplate>
  );
};
