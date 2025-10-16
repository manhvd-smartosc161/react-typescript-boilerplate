import React from 'react';
import { AccordionDetails, Typography, Box, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StyledAccordion } from './index.styled';
import { StyledAccordionSummary } from './index.styled';

interface CollapsibleCardProps {
  title: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onChange?: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  actions,
  children,
  defaultExpanded = true,
  expanded,
  onChange,
}) => {
  return (
    <StyledAccordion
      defaultExpanded={defaultExpanded}
      expanded={expanded}
      onChange={onChange}
      elevation={0}
    >
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="collapsible-card-content"
        id="collapsible-card-header"
      >
        <Typography variant="h6" component="div">
          {title}
        </Typography>

        {actions && (
          <Box onClick={(event) => event.stopPropagation()}>
            <Stack direction="row" spacing={1} alignItems="center">
              {actions}
            </Stack>
          </Box>
        )}
      </StyledAccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </StyledAccordion>
  );
};

export default CollapsibleCard;
