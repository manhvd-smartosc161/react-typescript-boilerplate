import { styled, alpha } from '@mui/material/styles';
import { TextField } from '@mui/material';

interface StyledInputProps {
  $success?: boolean;
}

export const StyledInput = styled(TextField)<StyledInputProps>(
  ({ theme, $success = false }) => ({
    // Outlined variant styling
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: $success
          ? theme.palette.success.main
          : theme.palette.grey[300],
        borderRadius: theme.shape.borderRadius,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
      },
      '&:hover fieldset': {
        borderColor: $success
          ? theme.palette.success.dark
          : theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: $success
          ? theme.palette.success.main
          : theme.palette.primary.main,
        borderWidth: 2,
        boxShadow: $success
          ? `${alpha(theme.palette.success.main, 0.25)} 0 0 0 0.2rem`
          : `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      },
      '&.Mui-error fieldset': {
        borderColor: theme.palette.error.main,
      },
      '&.Mui-error:hover fieldset': {
        borderColor: theme.palette.error.dark,
      },
      '&.Mui-error.Mui-focused fieldset': {
        borderColor: theme.palette.error.main,
        borderWidth: 2,
        boxShadow: `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`,
      },
      '& .MuiOutlinedInput-input': {
        padding: '12px 16px',
        fontSize: 16,
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ].join(','),
      },
    },

    // Filled variant styling
    '& .MuiFilledInput-root': {
      backgroundColor: $success
        ? alpha(theme.palette.success.main, 0.04)
        : '#F3F6F9',
      borderRadius: theme.shape.borderRadius,
      '&:before': {
        borderBottomColor: $success ? theme.palette.success.main : '#E0E3E7',
      },
      '&:after': {
        borderBottomColor: $success
          ? theme.palette.success.main
          : theme.palette.primary.main,
      },
      '&:hover:before': {
        borderBottomColor: $success
          ? theme.palette.success.dark
          : theme.palette.primary.main,
      },
      '&.Mui-focused:before': {
        borderBottomColor: $success
          ? theme.palette.success.main
          : theme.palette.primary.main,
      },
      '&.Mui-error:before': {
        borderBottomColor: theme.palette.error.main,
      },
      '&.Mui-error:after': {
        borderBottomColor: theme.palette.error.main,
      },
      '&.Mui-error:hover:before': {
        borderBottomColor: theme.palette.error.dark,
      },
      '& .MuiFilledInput-input': {
        padding: '12px 16px',
        fontSize: 16,
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ].join(','),
      },
      ...theme.applyStyles('dark', {
        backgroundColor: $success
          ? alpha(theme.palette.success.main, 0.08)
          : '#1A2027',
        '&:before': {
          borderBottomColor: $success ? theme.palette.success.main : '#2D3843',
        },
      }),
    },

    // Standard variant styling
    '& .MuiInput-root': {
      '&:before': {
        borderBottomColor: $success ? theme.palette.success.main : '#E0E3E7',
      },
      '&:after': {
        borderBottomColor: $success
          ? theme.palette.success.main
          : theme.palette.primary.main,
      },
      '&:hover:before': {
        borderBottomColor: $success
          ? theme.palette.success.dark
          : theme.palette.primary.main,
      },
      '&.Mui-error:before': {
        borderBottomColor: theme.palette.error.main,
      },
      '&.Mui-error:after': {
        borderBottomColor: theme.palette.error.main,
      },
      '&.Mui-error:hover:before': {
        borderBottomColor: theme.palette.error.dark,
      },
      '& .MuiInput-input': {
        padding: '12px 16px',
        fontSize: 16,
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ].join(','),
      },
      ...theme.applyStyles('dark', {
        '&:before': {
          borderBottomColor: $success ? theme.palette.success.main : '#2D3843',
        },
      }),
    },

    ...($success && {
      '& .MuiOutlinedInput-root, & .MuiFilledInput-root, & .MuiInput-root': {
        '&.Mui-focused': {
          boxShadow: `${alpha(theme.palette.success.main, 0.25)} 0 0 0 0.2rem`,
        },
      },
    }),
  }),
);
