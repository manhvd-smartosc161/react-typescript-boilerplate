import React from 'react';
import { Stack } from '@mui/material';
import { HeadingAtom, TextAtom } from '@src/components/atoms';
import {
  StyledFormSectionContainer,
  StyledSidebar,
  StyledContentArea,
  StyledContentGrid,
} from './index.styled';

interface FormSectionLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const FormSectionLayout: React.FC<FormSectionLayoutProps> = ({
  title,
  subtitle,
  children,
  ...props
}: FormSectionLayoutProps) => {
  return (
    <StyledFormSectionContainer container {...props}>
      <StyledSidebar size={{ xs: 12, md: 2.5 }}>
        <Stack spacing={1}>
          <HeadingAtom level={6}>{title}</HeadingAtom>
          {subtitle && (
            <TextAtom fontSize={'16px'} color="default">
              {subtitle}
            </TextAtom>
          )}
        </Stack>
      </StyledSidebar>

      <StyledContentArea size={{ xs: 12, md: 9.5 }}>
        <StyledContentGrid container spacing={3}>
          {children}
        </StyledContentGrid>
      </StyledContentArea>
    </StyledFormSectionContainer>
  );
};

export default FormSectionLayout;
