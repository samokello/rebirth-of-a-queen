import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const ThemeContext = createContext();

export function ThemeModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem('adminDarkMode');
    return stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem('adminDarkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: isDarkMode ? 'dark' : 'light',
        primary: { main: '#26a69a' },
        background: {
          default: isDarkMode ? '#181c1f' : '#f7fafd',
          paper: isDarkMode ? '#23272b' : '#fff',
        },
        text: {
          primary: isDarkMode ? '#fff' : '#212121',
          secondary: isDarkMode ? '#b0b0b0' : '#757575',
        },
        divider: isDarkMode ? '#333' : '#e0e0e0',
      },
      typography: {
        fontFamily: 'Poppins, Montserrat, Arial, sans-serif',
      },
    }),
    [isDarkMode]
  );

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          {children}
        </StyledThemeProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeContext);
} 