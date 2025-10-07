import React from 'react';
import { Stack, Grid } from '@mui/material';
import { HeadingAtom, TextAtom } from '@src/components/atoms';

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
    <Grid container {...props}>
      <Grid size={{ xs: 12, md: 3 }}>
        <Stack spacing={1}>
          <HeadingAtom level={6}>{title}</HeadingAtom>
          {subtitle && <TextAtom color="default">{subtitle}</TextAtom>}
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 9 }}>
        <Grid container spacing={3}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormSectionLayout;
