import React, { createContext, ReactNode, useCallback } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import dark from '../styles/themes/dark';
import light from '../styles/themes/light';
import usePersistedState from '../utils/persistedState';

export type CustomThemeThemeType = {
  theme: DefaultTheme;
  changeTheme(): void;
};

type CustomThemeProviderType = {
  children: ReactNode;
};

export const CustomThemeContext = createContext({} as CustomThemeThemeType);

export const CustomThemeProvider: React.FC<CustomThemeProviderType> = ({
  children
}) => {
  const [theme, setTheme] = usePersistedState('light', light);

  const changeTheme = useCallback(() => {
    setTheme(theme.name === 'light' ? dark : light);
  }, [theme, setTheme]);

  return (
    <CustomThemeContext.Provider value={{ theme, changeTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};
