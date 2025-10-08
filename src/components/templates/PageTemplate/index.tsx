import React, { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import { TitleAtom } from '@src/components/atoms';
import { StyledPageHeader, StyledSubtitle } from './index.styled';

interface PageTemplateProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
}

const PageTemplate: FC<PageTemplateProps> = ({
  children,
  title,
  subtitle,
  actions,
}) => {
  return (
    <Box>
      {(title || subtitle || actions) && (
        <StyledPageHeader>
          <Box>
            {title && <TitleAtom variant="h2">{title}</TitleAtom>}
            {subtitle && (
              <Box mt={1}>
                <StyledSubtitle>{subtitle}</StyledSubtitle>
              </Box>
            )}
          </Box>
          {actions && <Box>{actions}</Box>}
        </StyledPageHeader>
      )}
      {children}
    </Box>
  );
};

export default PageTemplate;
