import { createTheme } from '@mui/material/styles';
import { COLOR } from './color';

export const theme = createTheme({
  palette: {
    primary: {
      main: COLOR.blue[600],
      light: COLOR.blue[100],
      dark: COLOR.blue[800],
    },
    secondary: {
      main: COLOR.gray[600],
      light: COLOR.gray[100],
      dark: COLOR.gray[800],
    },
    success: {
      main: COLOR.green[600],
      light: COLOR.green[100],
      dark: COLOR.green[800],
    },
    warning: {
      main: COLOR.yellow[600],
      light: COLOR.yellow[100],
      dark: COLOR.yellow[800],
    },
    error: {
      main: COLOR.red[600],
      light: COLOR.red[100],
      dark: COLOR.red[800],
    },
    info: {
      main: COLOR.teal[600],
      light: COLOR.teal[100],
      dark: COLOR.teal[800],
    },
    background: {
      default: COLOR.white,
      paper: COLOR.gray[50],
    },
    text: {
      primary: COLOR.gray[900],
      secondary: COLOR.gray[600],
      disabled: COLOR.gray[400],
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
    h5: { fontSize: '1.25rem', fontWeight: 600 },
    h6: { fontSize: '1rem', fontWeight: 600 },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 2px rgba(0, 0, 0, 0.05)',
    '0 2px 8px rgba(0, 0, 0, 0.06)',
    '0 4px 16px rgba(0, 0, 0, 0.08)',
    '0 8px 32px rgba(0, 0, 0, 0.12)',
    '0 16px 64px rgba(0, 0, 0, 0.16)',
    '0 24px 128px rgba(0, 0, 0, 0.20)',
    '0 32px 256px rgba(0, 0, 0, 0.24)',
    '0 40px 512px rgba(0, 0, 0, 0.28)',
    '0 48px 1024px rgba(0, 0, 0, 0.32)',
    '0 56px 2048px rgba(0, 0, 0, 0.36)',
    '0 64px 4096px rgba(0, 0, 0, 0.40)',
    '0 72px 8192px rgba(0, 0, 0, 0.44)',
    '0 80px 16384px rgba(0, 0, 0, 0.48)',
    '0 88px 32768px rgba(0, 0, 0, 0.52)',
    '0 96px 65536px rgba(0, 0, 0, 0.56)',
    '0 104px 131072px rgba(0, 0, 0, 0.60)',
    '0 112px 262144px rgba(0, 0, 0, 0.64)',
    '0 120px 524288px rgba(0, 0, 0, 0.68)',
    '0 128px 1048576px rgba(0, 0, 0, 0.72)',
    '0 136px 2097152px rgba(0, 0, 0, 0.76)',
    '0 144px 4194304px rgba(0, 0, 0, 0.80)',
    '0 152px 8388608px rgba(0, 0, 0, 0.84)',
    '0 160px 16777216px rgba(0, 0, 0, 0.88)',
    '0 168px 33554432px rgba(0, 0, 0, 0.92)',
  ],
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
});

// Custom theme extensions
export const customTheme = {
  colors: {
    primary: COLOR.blue[600],
    primaryLight: COLOR.blue[100],
    primaryDark: COLOR.blue[800],

    secondary: COLOR.gray[600],
    secondaryLight: COLOR.gray[100],
    secondaryDark: COLOR.gray[800],

    success: COLOR.green[600],
    successLight: COLOR.green[100],
    successDark: COLOR.green[800],

    warning: COLOR.yellow[600],
    warningLight: COLOR.yellow[100],
    warningDark: COLOR.yellow[800],

    error: COLOR.red[600],
    errorLight: COLOR.red[100],
    errorDark: COLOR.red[800],

    info: COLOR.teal[600],
    infoLight: COLOR.teal[100],
    infoDark: COLOR.teal[800],

    // Background colors
    background: COLOR.white,
    backgroundSecondary: COLOR.gray[100],
    backgroundTertiary: COLOR.gray[200],

    // Text colors
    textPrimary: COLOR.gray[900],
    textSecondary: COLOR.gray[600],
    textDisabled: COLOR.gray[400],

    // Border colors
    border: COLOR.gray[300],
    borderLight: COLOR.gray[200],
    borderDark: COLOR.gray[400],
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    round: '50%',
  },

  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 2px 8px rgba(0, 0, 0, 0.06)',
    lg: '0 4px 16px rgba(0, 0, 0, 0.08)',
    xl: '0 8px 32px rgba(0, 0, 0, 0.12)',
  },

  typography: {
    fontSizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px',
      xxl: '24px',
      xxxl: '32px',
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8,
    },
  },

  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px',
  },

  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
};

export type Theme = typeof theme;
