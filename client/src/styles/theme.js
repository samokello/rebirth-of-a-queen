import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8B5CF6', // Purple
      dark: '#7C3AED',
      light: '#A78BFA',
    },
    secondary: {
      main: '#F59E0B', // Amber
      dark: '#D97706',
      light: '#FBBF24',
    },
    background: {
      default: '#FFFFFF', // Pure white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F2937', // Dark gray for excellent readability
      secondary: '#4B5563', // Medium gray for secondary text
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F59E0B',
    },
    info: {
      main: '#3B82F6',
    },
    success: {
      main: '#10B981',
    },
  },
  typography: {
    fontFamily: 'Poppins, Montserrat, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      color: '#1F2937',
    },
    h2: {
      fontWeight: 700,
      color: '#1F2937',
    },
    h3: {
      fontWeight: 600,
      color: '#1F2937',
    },
    h4: {
      fontWeight: 600,
      color: '#1F2937',
    },
    h5: {
      fontWeight: 600,
      color: '#1F2937',
    },
    h6: {
      fontWeight: 600,
      color: '#1F2937',
    },
    body1: {
      color: '#4B5563',
    },
    body2: {
      color: '#4B5563',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0,0,0,0.12)',
    '0px 1px 5px rgba(0,0,0,0.15)',
    ...Array(22).fill('0px 4px 20px rgba(0,0,0,0.1)')
  ],
});

export default theme;
  