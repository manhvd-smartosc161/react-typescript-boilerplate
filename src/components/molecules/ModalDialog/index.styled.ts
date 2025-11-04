import { Box, Dialog, DialogActions, DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledDialogContainer = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '24px',
    boxShadow: theme.shadows[3],
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      margin: 0,
      width: '100%',
    },
  },
}));

export const StyledHeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 1.5, 0),
  svg: {
    cursor: 'pointer',
  },
}));

export const StyledTitleText = styled('div')(({ theme }) => ({
  ...theme.typography.h3,
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const StyledContentWrapper = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3, 0),
}));

export const StyledFooterWrapper = styled(DialogActions)(({ theme }) => ({
  justifyContent: 'start',
  padding: theme.spacing(2, 0),
}));
