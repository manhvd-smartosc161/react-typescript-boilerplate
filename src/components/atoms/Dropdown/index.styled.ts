import { styled, alpha } from '@mui/material/styles';
import { Select, FormControl } from '@mui/material';

interface StyledDropdownProps {
  $success?: boolean;
}

interface StyledFormControlProps {
  $success?: boolean;
}

export const StyledDropdown = styled(Select)<StyledDropdownProps>(
  ({ theme, $success = false }) => ({
    '& .MuiOutlinedInput-root': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: $success
          ? theme.palette.success.main
          : theme.palette.grey[300],
        borderRadius: theme.shape.borderRadius,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: $success
          ? theme.palette.success.dark
          : theme.palette.primary.main,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: $success
          ? theme.palette.success.main
          : theme.palette.primary.main,
        borderWidth: 2,
        boxShadow: $success
          ? `${alpha(theme.palette.success.main, 0.25)} 0 0 0 0.2rem`
          : `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      },
      '& .MuiSelect-select': {
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
      '& .MuiSelect-select': {
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

    ...($success && {
      '& .MuiOutlinedInput-root, & .MuiFilledInput-root': {
        '&.Mui-focused': {
          boxShadow: `${alpha(theme.palette.success.main, 0.25)} 0 0 0 0.2rem`,
        },
      },
    }),
  }),
);

export const StyledFormControl = styled(FormControl)<StyledFormControlProps>(
  ({ theme, $success = false }) => ({
    '& .MuiInputLabel-root': {
      color: theme.palette.text.secondary,
      fontSize: '1rem',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      '&.Mui-focused': {
        color: $success
          ? theme.palette.success.main
          : theme.palette.primary.main,
      },
    },
  }),
);
