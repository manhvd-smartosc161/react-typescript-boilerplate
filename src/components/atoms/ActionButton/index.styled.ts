import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Base styles for all buttons
const baseButtonStyles = {
  color: 'white',
  textTransform: 'none' as const,
  fontWeight: 'bold',
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
  return styled(Button)(() => ({
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
  }));
};

export const PrimaryButton = createStyledButton({
  backgroundColor: '#6f42c1',
  hoverColor: '#5a32a3',
});

export const SuccessButton = createStyledButton({
  backgroundColor: '#28a745',
  hoverColor: '#218838',
});

export const ActionButton = createStyledButton({
  backgroundColor: '#6f42c1',
  hoverColor: '#5a32a3',
});

export const ReportButton = createStyledButton({
  backgroundColor: '#6f42c1',
  hoverColor: '#5a32a3',
  borderRadius: '6px',
  padding: '8px 16px',
  fontSize: '14px',
});

export const DangerButton = createStyledButton({
  backgroundColor: '#dc3545',
  hoverColor: '#c82333',
});
