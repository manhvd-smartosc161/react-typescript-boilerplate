import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';

interface StyledBreadcrumbLinkProps {
  component?: React.ElementType;
  variant?: string;
  onClick?: () => void;
}

export const StyledBreadcrumbLink = styled(Link)<StyledBreadcrumbLinkProps>(
  () => ({
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  }),
);
