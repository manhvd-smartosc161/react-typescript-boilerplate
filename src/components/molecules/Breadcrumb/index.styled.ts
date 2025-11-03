import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';

interface StyledBreadcrumbLinkProps {
  component?: React.ElementType;
  variant?: string;
  onClick?: () => void;
}

export const StyledBreadcrumbLink = styled(Link)<StyledBreadcrumbLinkProps>(
  ({ theme }) => ({
    cursor: 'pointer',
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    fontSize: 16,
  }),
);
