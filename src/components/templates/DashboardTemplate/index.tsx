import React, { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import { TitleAtom } from '@src/components/atoms';

interface DashboardTemplateProps {
  children: ReactNode;
  title?: string;
}

const DashboardTemplate: FC<DashboardTemplateProps> = ({
  children,
  title = 'Dashboard',
}) => {
  return (
    <Box>
      <TitleAtom level={2}>{title}</TitleAtom>
      {children}
    </Box>
  );
};

export default DashboardTemplate;
