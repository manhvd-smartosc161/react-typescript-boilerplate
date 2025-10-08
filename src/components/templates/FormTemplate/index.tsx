import React, { FC, ReactNode } from 'react';
import { Typography } from '@mui/material';
import { TitleAtom } from '@src/components/atoms';
import {
  StyledFormContainer,
  StyledFormPaper,
  StyledFormHeader,
} from './index.styled';

interface FormTemplateProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  maxWidth?: string | number;
}

const FormTemplate: FC<FormTemplateProps> = ({
  children,
  title,
  subtitle,
  maxWidth = 600,
}) => {
  return (
    <StyledFormContainer>
      <StyledFormPaper elevation={3} $maxWidth={maxWidth}>
        {title && (
          <StyledFormHeader>
            <TitleAtom variant="h3">{title}</TitleAtom>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </StyledFormHeader>
        )}
        {children}
      </StyledFormPaper>
    </StyledFormContainer>
  );
};

export default FormTemplate;
