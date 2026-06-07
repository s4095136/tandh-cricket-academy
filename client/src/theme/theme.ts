import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#032053',
      light: '#0a3a8c',
      dark: '#021640',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f5c842',
      light: '#f8d76a',
      dark: '#c9a100',
      contrastText: '#032053',
    },
    background: {
      default: '#ffffff',
      paper: '#f4f6fb',
    },
    text: {
      primary: '#032053',
      secondary: '#3a5275',
    },
    divider: 'rgba(3,32,83,0.1)',
  },

  typography: {
    fontFamily: '"DM Sans", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontFamily: '"Bebas Neue", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.04em',
      lineHeight: 1.0,
    },
    h2: {
      fontFamily: '"Bebas Neue", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.04em',
      lineHeight: 1.05,
    },
    h3: {
      fontFamily: '"Bebas Neue", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.03em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { lineHeight: 1.75, fontSize: '1rem' },
    body2: { lineHeight: 1.65, fontSize: '0.875rem' },
    button: {
      fontWeight: 600,
      letterSpacing: '0.01em',
      textTransform: 'none',
    },
    overline: {
      fontWeight: 700,
      letterSpacing: '0.18em',
      fontSize: '0.68rem',
    },
    caption: {
      fontSize: '0.78rem'
    },
  },

  shape: { borderRadius: 10 },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '11px 26px',
          fontSize: '0.9rem',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        contained: {
          '&.MuiButton-containedPrimary': {
            background: 'linear-gradient(135deg, #032053 0%, #0a3a8c 100%)',
            color: '#ffffff',
            '&:hover': {
              background: 'linear-gradient(135deg, #021640 0%, #032053 100%)',
            },
          },
        },
        outlined: {
          '&.MuiButton-outlinedPrimary': {
            borderWidth: '1.5px',
            '&:hover': { borderWidth: '1.5px' },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: 'none' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: '0 2px 8px rgba(3,32,83,0.06), 0 0 1px rgba(3,32,83,0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 600,
          fontSize: '0.72rem',
        },
      },
    },
  },
})

export default theme
