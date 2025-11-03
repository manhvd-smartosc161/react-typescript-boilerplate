import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { StyledRoot } from './index.styled';

export interface ActionButtonsGroupProps {
  children: React.ReactNode;
}

const ActionButtonsGroup = ({ children }: ActionButtonsGroupProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledRoot
      direction={isMobile ? 'column' : 'row'}
      spacing={isMobile ? 1 : 2}
      sx={{
        width: isMobile ? '100%' : 'auto',
      }}
    >
      {children}
    </StyledRoot>
  );
};

export default ActionButtonsGroup;
