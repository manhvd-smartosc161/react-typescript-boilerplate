import { styled } from '@mui/material/styles';
import { StepLabel } from '@mui/material';

export const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
  '& .MuiStepLabel-label': {
    color: theme.palette.primary.main,
  },
  '& .Mui-completed .MuiStepLabel-label': {
    color: theme.palette.success.main,
  },
}));
