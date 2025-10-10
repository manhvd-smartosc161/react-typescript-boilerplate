import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Base styles for all buttons
const baseButtonStyles = {
  color: 'white',
  textTransform: 'none' as const,
  fontWeight: 'bold',
  whiteSpace: 'nowrap' as const,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '&:disabled': {
    color: 'white',
    opacity: 0.6,
    '& .MuiButton-startIcon': {
      color: 'white',
    },
  },
};

// Create styled button with base styles and specific config
const createStyledButton = (config: {
  backgroundColor: string;
  hoverColor: string;
  borderRadius?: string;
  minWidth?: string;
  padding?: string;
  fontSize?: string;
}) => {
  return styled(Button)(({ theme }) => ({
    ...baseButtonStyles,
    backgroundColor: config.backgroundColor,
    borderRadius: config.borderRadius || '4px',
    minWidth: config.minWidth || '80px',
    ...(config.padding && { padding: config.padding }),
    ...(config.fontSize && { fontSize: config.fontSize }),
    '&:hover': {
      backgroundColor: config.hoverColor,
    },
    '&:disabled': {
      ...baseButtonStyles['&:disabled'],
      backgroundColor: config.backgroundColor,
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '80px',
      padding: '4px 8px',
      fontSize: '12px',
    },
  }));
};

export const PrimaryButton = createStyledButton({
  backgroundColor: '#1976d2',
  hoverColor: '#5a32a3',
  minWidth: '100px',
  padding: '6px 12px',
});

export const SuccessButton = createStyledButton({
  backgroundColor: '#28a745',
  hoverColor: '#218838',
  minWidth: '100px',
  padding: '6px 12px',
});

export const ActionButton = createStyledButton({
  backgroundColor: '#1976d2',
  hoverColor: '#5a32a3',
  minWidth: '100px',
  padding: '6px 12px',
});

export const ReportButton = createStyledButton({
  backgroundColor: '#1976d2',
  hoverColor: '#5a32a3',
  borderRadius: '6px',
  padding: '8px 16px',
  fontSize: '14px',
});

export const DangerButton = createStyledButton({
  backgroundColor: '#dc3545',
  hoverColor: '#c82333',
});
