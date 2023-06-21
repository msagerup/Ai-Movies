import React, { createContext, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext();

const ToggleColorMode = ({ children }) => {
  const [mode, setmode] = useState('light');

  const toggleColorMode = () => {
    setmode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () => createTheme({
      palette: {
        mode,
      },
    }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={{ mode, setmode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorMode;
