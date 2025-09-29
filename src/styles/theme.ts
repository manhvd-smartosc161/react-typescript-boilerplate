import { COLOR } from './color';

export const theme = {
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
