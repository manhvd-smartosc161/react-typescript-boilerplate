import {
  styled,
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
} from '@mui/material';

export const StyledAccordion = styled(MuiAccordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  '&:before': {
    display: 'none',
  },
  '&:first-of-type': {
    borderRadius: 12,
  },
  '&:last-of-type': {
    borderRadius: 12,
  },
}));

export const StyledAccordionSummary = styled(MuiAccordionSummary)(
  ({ theme }) => ({
    backgroundColor: '#EDF4FF',
    minHeight: '48px',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginRight: theme.spacing(1),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
  }),
);
